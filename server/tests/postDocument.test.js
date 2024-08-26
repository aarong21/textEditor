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


describe('POST /documents', () => {
    // Basic post test
    it('should create a new document', async () => {
        const res = await request(app)
            .post('/documents')
            .send({
                title: 'Test Document 123',
                content: 'Test content with numbers 456'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    // missing title should return 400
    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/documents')
            .send({ content: 'Test content' }); // no title
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Title must be a string');
    });

    // allow missing content (user might want to create an empty document)
    it('should allow an empty content field', async () => {
        const res = await request(app)
            .post('/documents')
            .send({ title: 'Empty Content Document' }); // no content
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    // allow title that is just numbers
    it('should allow a title that is just numbers', async () => {
        const res = await request(app)
            .post('/documents')
            .send({ title: '12345', content: 'Content with just numbers' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    // invalid title
    it('should return 400 if title is not a string', async () => {
        const res = await request(app)
            .post('/documents')
            .send({ title: 12345, content: 'Valid content' }); // Title must be a string
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Title must be a string');
    });

    // extra fields --> ignored
    it('should ignore extra fields not defined in schema', async () => {
        const res = await request(app)
            .post('/documents')
            .send({
                title: 'Test Document',
                content: 'Test content',
                extraField: 'This should be ignored'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).not.toHaveProperty('extraField');
    });

    // empty body should return 400 (since title is required)
    it('should return 400 if body is empty', async () => {
        const res = await request(app).post('/documents').send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Title must be a string');
    });

    // large input
    it('should handle large input sizes', async () => {
        const largeContent = 'a'.repeat(100000); // 100,000 characters
        const res = await request(app)
            .post('/documents')
            .send({ title: 'Large Input Test', content: largeContent });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });
});
