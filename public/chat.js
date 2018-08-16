//Esto inicia la comunicacion con el servido por medio de websocket
const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//Desde aca puedo enviar mensajes al servidor con websocket
btn.addEventListener('click', function() {
	socket.emit('chat:message', {
		username: username.value,
		message: message.value
	});
});

message.addEventListener('keypress', function() {
	console.log(username.value);
	socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data) {
	actions.innerHTML = '';
	output.innerHTML += `
		<p>
			<strong>${ data.username }</strong>: ${ data.message }
		</p>
	`;
});

socket.on('chat:typing', function(data) {
	actions.innerHTML = `
		<p>
			<em>${ data } esta escribiendo un mensaje ...</em>
		</p>
	`;
});