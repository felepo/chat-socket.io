const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), () => {
	console.log('Server on Port ', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

//Aca se establece la coneccion con el websocket entre el servidor y el cliente
io.on('connection', (socket) => {
	console.log('Nueva coneccion', socket.id);
	//console.log(socket.address);

	//Aca recibo el mensaje desde algun cliente
	socket.on('chat:message', (data) => {
		//Se emite un mensaje para que todos puedan recibir informacion
		io.sockets.emit('chat:message', data);
	});

	socket.on('chat:typing', (data) => {
		//Se envia los datos a todos menos a quien este escribiendo
		socket.broadcast.emit('chat:typing', data);
	});
})

