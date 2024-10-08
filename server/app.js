const express = require('express');
const mongoose = require('mongoose');
const Document = require('./Document');
const app = express();

const cors = require('cors');
app.use(cors());
const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const defaultValue = ""

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/text-Editor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// // Middleware to parse JSON requests
// app.use(express.json());

// Socket.io logic
io.on('connection', (socket) => {
    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document", document.data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })
        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, {data})
        })
    })
});

// Retrieve document by id
async function findOrCreateDocument(id) {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({_id: id, data: defaultValue})
}


// Trashed API routes
// // ---------------
// // API Routes

// // POST /documents - Save a new document
// app.post('/documents', async (req, res) => {
//     const { title, content } = req.body;

//     if (typeof title !== 'string') {
//         return res.status(400).json({ message: 'Title must be a string' });
//     }

//     if (content && typeof content !== 'string') {
//         return res.status(400).json({ message: 'Content must be a string' });
//     }

//     try {
//         const newDocument = new Document({ title, content });
//         await newDocument.save();
//         res.status(201).json(newDocument);
//     } catch (error) {
//         res.status(400).json({ message: 'Error saving document', error });
//     }
// });

// // GET /documents - Get all documents
// app.get('/documents', async (req, res) => {
//     try {
//         const documents = await Document.find();
//         res.status(200).json(documents);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving documents', error });
//     }
// });

// // GET /documents/:id - Get a document by ID
// app.get('/documents/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid document ID' });
//     }

//     try {
//         const document = await Document.findById(id);
//         if (!document) {
//             return res.status(404).json({ message: 'Document not found' });
//         }
//         res.status(200).json(document);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving document', error });
//     }
// });

// // PUT /documents/:id - Update a document by ID
// app.put('/documents/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, content } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid document ID' });
//     }
//     // Allow updating either title or content, but ensure at least one is provided
//     if (!title && !content) {
//         return res.status(400).json({ message: 'No fields to update' });
//     }
//     // Validate the types if they are provided
//     if (title && typeof title !== 'string') {
//         return res.status(400).json({ message: 'Title must be a string' });
//     }
//     if (content && typeof content !== 'string') {
//         return res.status(400).json({ message: 'Content must be a string' });
//     }

//     try {
//         const updates = {};
//         if (title) updates.title = title;
//         if (content) updates.content = content;
//         const document = await Document.findByIdAndUpdate(
//             id,
//             updates,
//             { new: true, runValidators: true }
//         );
//         if (!document) {
//             return res.status(404).json({ message: 'Document not found' });
//         }
//         res.status(200).json(document);
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating document', error });
//     }
// });




// // DELETE /documents/:id - Delete a document by ID
// app.delete('/documents/:id', async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid document ID' });
//     }

//     try {
//         const document = await Document.findByIdAndDelete(id);

//         if (!document) {
//             return res.status(404).json({ message: 'Document not found' });
//         }

//         res.status(200).json({ message: 'Document deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting document', error });
//     }
// });

// // Start the server only if not in a test environment
// if (process.env.NODE_ENV !== 'test') {
//     const PORT = process.env.PORT || 4000;
//     server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// }

// // Export the app and server for testing
// module.exports = { app, server };
