export interface MongodbConfig{
  url: string
  driver: string
  host: string
  port: number
  database: string
}

export interface AppConfig{
  url: string
  port: number
  logLevel: string
}

export interface JwtConfig{
  pathPrivateCertificate: string
  pathPublicCertificate: string
  publicCertificate: Buffer
  privateCertificate: Buffer
  timeout: number
}

export interface RedisConfig{
  host: string
  port: number
  password: string
  context: string
}

export interface ConfigInterface {
  mongodb : MongodbConfig
  redis: RedisConfig
  jwt: JwtConfig
  app : AppConfig
}
