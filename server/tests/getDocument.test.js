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


describe('GET /documents', () => {

    // basic get test
    it('should get all documents', async () => {
        const res = await request(app).get('/documents');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // empty db
    it('should return an empty array if no documents exist', async () => {
        await Document.deleteMany(); // Clear the collection
        const res = await request(app).get('/documents');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    // large datasets
    it('should handle large numbers of documents', async () => {
        const documents = Array.from({ length: 1000 }, (_, i) => ({
            title: `Document ${i}`,
            content: 'Test content'
        }));
        await Document.insertMany(documents);
        const res = await request(app).get('/documents');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1000);
    });

    // retrieve all
    it('should return all documents', async () => {
        // Insert some documents for testing
        await Document.insertMany([
            { title: 'Document 1', content: 'Content 1' },
            { title: 'Document 2', content: 'Content 2' }
        ]);

        const res = await request(app).get('/documents');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
    });

    // empty db
    it('should return an empty array if no documents exist', async () => {
        await Document.deleteMany(); // Clear the collection

        const res = await request(app).get('/documents');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(0);
    });

    // retrieving by doc id
    it('should return a document by ID', async () => {
        const document = new Document({ title: 'Specific Document', content: 'Specific Content' });
        await document.save();

        const res = await request(app).get(`/documents/${document._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', document._id.toString());
        expect(res.body).toHaveProperty('title', 'Specific Document');
        expect(res.body).toHaveProperty('content', 'Specific Content');
    });

    // getting non-existant id
    it('should return 404 if document does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/documents/${fakeId}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Document not found');
    });

    // testing invalid id
    it('should return 400 for an invalid document ID format', async () => {
        const res = await request(app).get('/documents/invalid-id');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid document ID');
    });
});

