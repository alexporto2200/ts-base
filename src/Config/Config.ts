import { ConfigInterface, MongodbConfig, AppConfig, RedisConfig, JwtConfig } from './ConfigInterface'
import fs from 'fs'

class Config {
  public config : ConfigInterface;

  public constructor () {
    this.config = {} as ConfigInterface
    this.setAppEnvs()
    this.setJwtEnvs()
    this.setMongoEnvs()
    this.setRedisEnvs()
  }

  private setAppEnvs () {
    this.config.app = {} as AppConfig
    this.config.app.port = (parseInt(<string>process.env.APP_PORT, 10)) || 13000
    this.config.app.url = this.config.app.url || 'http://localhost:' + this.config.app.port
    this.config.app.logLevel = process.env.LOG_LEVEL || 'error'
  }

  private setJwtEnvs () {
    this.config.jwt = {} as JwtConfig
    this.config.jwt.pathPrivateCertificate = process.env.JWT_PATH_PRIVATE_CERTIFICATE || 'private/jwt-private.pem'
    this.config.jwt.privateCertificate = fs.readFileSync(this.config.jwt.pathPrivateCertificate)
    this.config.jwt.pathPublicCertificate = process.env.JWT_PATH_PUBLIC_CERTIFICATE || 'private/jwt-public.pem'
    this.config.jwt.publicCertificate = fs.readFileSync(this.config.jwt.pathPublicCertificate)
    this.config.jwt.timeout = (parseInt(<string>process.env.JWT_TIMEOUT, 10)) || 6000
  }

  private setMongoEnvs () {
    this.config.mongodb = {} as MongodbConfig
    this.config.mongodb.driver = process.env.MONGODB_DRIVER || 'mongodb'
    this.config.mongodb.host = process.env.MONGODB_HOST || 'localhost'
    this.config.mongodb.port = parseInt(<string>process.env.MONGODB_PORT, 10) || 27017
    this.config.mongodb.database = process.env.MONGODB_DATABASE || 'nodeapp'
    this.config.mongodb.url = this.config.mongodb.driver + '://' + this.config.mongodb.host +
      ':' + this.config.mongodb.port + '/' + this.config.mongodb.database
  }

  private setRedisEnvs () {
    this.config.redis = {} as RedisConfig
    this.config.redis.host = process.env.REDIS_HOST || 'localhost'
    this.config.redis.port = parseInt(<string>process.env.MONGODB_PORT, 10) || 6379
    this.config.redis.password = process.env.REDIS_PASSWORD || ''
    this.config.redis.context = process.env.REDIS_CONTEXT || ''
  }
}

export default new Config().config
