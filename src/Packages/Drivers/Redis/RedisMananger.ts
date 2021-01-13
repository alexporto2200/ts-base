import redis, { RedisClient } from 'redis'
import { RedisConfig } from '../../../Config/ConfigInterface'
import config from '../../../Config/Config'
import { promisify } from 'util'

class RedisMananger {
  public configRedis: RedisConfig
  public redisClient: RedisClient

  public constructor () {
    this.createInstance()
  }

  public createInstance () : void {
    this.redisClient = redis.createClient(config.redis.port, config.redis.host)
    this.redisClient.on('error', (err) => {
      console.log('Redis error: ', err)
    })
  }

  public async get (key: string) : Promise<string> {
    return await new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, reply) => {
        if (err) {
          reject(err)
        }
        resolve(reply)
      })
    })

    // const get = promisify(this.redisClient.get).bind(this.redisClient)
    // return await get(key)
  }

  public async set (key: string, value: string, expireTime: number | null = null) : Promise<boolean> {
    const set = promisify(this.redisClient.set).bind(this.redisClient)
    if (expireTime !== null) {
      return await set(key, value, 'EX', expireTime)
    }
    return await set(key, value)
  }

  public async exists (key: string): Promise<boolean> {
    const exists = promisify(this.redisClient.exists).bind(this.redisClient)
    return await exists(key)
  }
}

export default new RedisMananger()
