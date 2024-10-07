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
      console.log("Socket.io already booted")
      return
    }
    console.log("Booting Socket.io server")
    this.booted = true
    this.io = new Server(this.instance, this.configs)
    console.log("Socket.io server booted with configs: ", this.configs)
  }
}

export default new Ws()