import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server
  private booted = false
  private instance = AdonisServer.instance!
  private configs = {
    cors: {
      origin: '*', 
      allowedHeaders: ['Authorization', 'Content-Type'], 
      credentials: true, 
    }
  }

  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      
      return
    }
    
    this.booted = true
    this.io = new Server(this.instance, this.configs)
   
  }
}

export default new Ws()