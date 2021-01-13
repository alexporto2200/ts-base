
import { Request, Response, NextFunction } from 'express'
import config from '../../Config/Config'
import ManangerCache from '../Drivers/Redis/RedisMananger'
import jwt from 'jsonwebtoken'
import crypto from 'crypto-js'
import WordArray from 'crypto-js/lib-typedarrays'

interface Payload {
  username: string
  app: string
  key: string
  iat: number
  exp: number
}

export class SessionMananger {
  public static createSession (req : Request, res: Response) : void {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ error: 'Usuario ou senha são obrigatórios!' })
    } else {
      if (req.body.username === 'alex' && req.body.password === '111') {
        // gerar token
        const keyToken : WordArray = crypto.SHA256(config.app.url + req.body.username + config.jwt.timeout)

        const token = jwt.sign(
          { username: req.body.username, app: config.app.url },
          config.jwt.privateCertificate,
          { algorithm: 'RS512', expiresIn: config.jwt.timeout + ' Seconds' })
        // gravar token no redis
        SessionMananger.addSessionCache(keyToken, token)
        // enviar o token no header e no body
        res.header('token', token)
        res.status(200).json({ token: token })
      } else {
        res.status(401).json({ error: 'Usuario ou senha inválidos' })
      }
    }
  }

  public static async verifySession (req : Request, res: Response, next : NextFunction) : Promise<void> {
    if (!req.headers.token) {
      res.status(401).json({ error: 'Token inexistente' })
    } else {
      try {
        const token = <string> req.headers.token
        const payload = <Payload> jwt.verify(token, config.jwt.publicCertificate, { algorithms: ['RS512'] })
        if (SessionMananger.verifyPayload(payload) && await SessionMananger.verifySessionCache(payload, token)) {
          next()
        } else {
          res.status(401).json({ error: 'Token inválido' })
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({ error: 'Token expirado' })
        } else {
          console.log(err)
          res.status(401).json({ error: 'Token inválido' })
        }
      }
    }
  }

  private static addSessionCache (keyToken: WordArray, token: string) {
    const key: string = <string> keyToken.toString()
    return ManangerCache.set(key, token, config.jwt.timeout)
  }

  private static async verifySessionCache (payload: Payload, token: string) : Promise<boolean> {
    const keyToken : WordArray = crypto.SHA256(config.app.url + payload.username + config.jwt.timeout)
    const key: string = <string>keyToken.toString()

    return await ManangerCache.exists(key) && await ManangerCache.get(key) === token
  }

  private static verifyPayload (payload: Payload): boolean {
    return Object.values(payload).every(key => key)
  }
}
export default new SessionMananger()
