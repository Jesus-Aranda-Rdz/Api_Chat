import Ws from 'App/Services/Ws'

Ws.boot()


/**
 * Listen for incoming socket connections
 */

Ws.io.on('connection',async  (socket) => {
  
  socket.emit('new:message', {Participants:[],emiter:"",chat:""})


  socket.on('new:message', (data) => {
    console.log(data)
  })

  socket.on('new:chat', (data) => {
    console.log(data)
  })
  
})

 