import { Request, Response } from 'express'

class ControllerUser {
  public get (req :Request, res: Response) : void {
    res.json({ v1: 'asdf' })
  }

  public getAdmin (req :Request, res: Response) : void {
    res.json({ v1: 'admin' })
  }
}
export default ControllerUser
