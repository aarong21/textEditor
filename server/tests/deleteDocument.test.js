const request = require('supertest');
const { app, server } = require('../app');
const mongoose = require('mongoose');
const Document = require('../models/Documents');

// Clear all documents before each test
beforeEach(async () => {
    await Document.deleteMany();
});

// Close the server and database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

// Clear all documents before each test
beforeEach(async () => {
    await Document.deleteMany();
});


describe('DELETE /documents/:id', () => {
    // delete by id
    it('should delete a document by ID', async () => {
        const document = new Document({ title: 'Test', content: 'Content' });
        await document.save();
        
        const res = await request(app).delete(`/documents/${document._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Document deleted');
    });

    // deleting non-existant doc
    it('should return 404 if document does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/documents/${fakeId}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Document not found');
    });

    // deleting invalid id
    it('should return 400 for an invalid document ID format', async () => {
        const res = await request(app).delete('/documents/invalid-id');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid document ID');
    });

    // deleting already deleted doc
    it('should return 404 if the document was already deleted', async () => {
        const document = new Document({ title: 'Test', content: 'Content' });
        await document.save();
        
        // Delete the document
        await request(app).delete(`/documents/${document._id}`);
        
        // Attempt to delete again
        const res = await request(app).delete(`/documents/${document._id}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Document not found');
    });
    
});
