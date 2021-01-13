import mongoose from 'mongoose'
import { MongodbConfig } from '../../../Config/ConfigInterface'

class MongodbMananger {
  private mongodbConfig: MongodbConfig;

  public constructor (mongodbConfig: MongodbConfig) {
    this.mongodbConfig = mongodbConfig
  }

  public createInstance () : void {
    mongoose.connect(this.mongodbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

export default MongodbMananger
