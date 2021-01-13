import express, { json, urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pino from 'pino'
import expressPino from 'express-pino-logger'

import config from './Config/Config'
import router from './Router'

class App {
    public app : express.Application

    public constructor () {
      this.loadApp()
    }

    private loadApp () {
      const logger = pino({ level: config.app.logLevel })
      const expressLogger = expressPino({ logger })

      this.app = express()
      this.app.use(expressLogger)
      this.app.use(helmet())
      this.app.use(json())
      this.app.use(urlencoded({ extended: true }))
      this.app.use(cors({
        origin: config.app.url
      }))
      this.app.use('/', router)
    }
}

export default new App().app.listen(config.app.port, () => {
  console.log('🚀 Server started on ' + config.app.url)
})
