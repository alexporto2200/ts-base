import express from 'express'
import routerUser from './Modules/User/RouterUser'
import { SessionMananger } from './Packages/Session/SessionMananger'
class Router {
  public route: express.Router

  public constructor () {
    this.route = express.Router()
    this.loadPublicRoutes()
    this.loadPrivateRoutes()
  }

  private loadPublicRoutes () {
    this.route.post('/login', SessionMananger.createSession)
  }

  private loadPrivateRoutes () {
    this.route.use(SessionMananger.verifySession)
    this.route.use('/user', routerUser)
  }
}

export default new Router().route
