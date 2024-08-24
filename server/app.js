const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Document = require('./models/Documents');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDBmon
mongoose.connect('mongodb://localhost:27017/text-Editor');
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware to parse JSON requests
app.use(express.json());

// Socket.io logic
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// API Route Example
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Saving a document
app.post('/save', async (req, res) => {
    const { content } = req.body;
    const newDocument = new Document({ content });
    await newDocument.save();
    res.status(200).send('Document saved');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
