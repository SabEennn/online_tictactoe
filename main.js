import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static('public'))
app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('clickBtn', (val) => {
		console.log(val)
		socket.broadcast.emit('serverToClient', val);
	})


});

server.listen(3000, () => {
	console.log('server running at http://localhost:3000');
});