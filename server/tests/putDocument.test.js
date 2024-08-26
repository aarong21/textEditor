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


describe('PUT /documents/:id', () => {
    // updating fake doc id 
    it('should return 404 if trying to update non-existent document', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/documents/${fakeId}`)
            .send({ title: 'New Title', content: 'New Content' });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message', 'Document not found');
    });

    // successful update
    it('should update an existing document successfully', async () => {
        const document = new Document({ title: 'Old Title', content: 'Old Content' });
        await document.save();

        const res = await request(app)
            .put(`/documents/${document._id}`)
            .send({ title: 'Updated Title', content: 'Updated Content' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', document._id.toString());
        expect(res.body).toHaveProperty('title', 'Updated Title');
        expect(res.body).toHaveProperty('content', 'Updated Content');
    });

    // Test for updating with missing title but present content
    it('should update the content and return 200 even if the title is missing', async () => {
        const document = new Document({ title: 'Original Title', content: 'Original Content' });
        await document.save();

        const res = await request(app)
            .put(`/documents/${document._id}`)
            .send({ content: 'Updated Content' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Original Title');
        expect(res.body).toHaveProperty('content', 'Updated Content');
    });

    // test for no changes --> should not change doc at all
    it('should return 400 if no changes are sent', async () => {
        const document = new Document({ title: 'Title', content: 'Content' });
        await document.save();
    
        const res = await request(app)
            .put(`/documents/${document._id}`)
            .send({}); // No updates
    
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'No fields to update');
    });
    

    // invalid doc ID
    it('should return 400 if the document ID is invalid', async () => {
        const res = await request(app)
            .put('/documents/invalid-id')
            .send({ title: 'New Title', content: 'New Content' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid document ID');
    });

});
