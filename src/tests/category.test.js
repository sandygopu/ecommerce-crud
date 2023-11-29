const request = require('supertest');
const app = require('../app');

let token;
let id;


beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
})



test('GET /categories', async () => { 
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => { 
    const category = {
        name: 'SmartTV'
    }
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization',`Bearer ${token}`);
    
    id = res.body.id;    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(category.name);
});

test('DELETE /categories', async () => {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});

