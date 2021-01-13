import express from 'express'
import ControllerUser from './ControllerUser'

class RouterUser {
  public route: express.Router
  private controller: ControllerUser

  public constructor () {
    this.route = express.Router()
    this.controller = new ControllerUser()
    this.loadRoutes()
  }

  private loadRoutes () {
    this.route.get('/', this.controller.get)
    this.route.get('/admin', this.controller.getAdmin)
  }
}

export default new RouterUser().route
