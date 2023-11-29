const request = require('supertest');
const app = require('../app');
const { expectCt } = require('helmet');

let id;
let token;




test('POST /users',  async () => { 
    const body = {
        firstName: 'Sandy',
        lastName: 'Gomez',
        email: 'sandygomepulido@correo.com',
        password: 'sandy',
        phone: '123456789'

    }

    const res = await request(app).post('/users').send(body);
    console.log(res.body)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
 });

 

  test('POST /users/login', async () => { 
    const body = {
        email: 'sandygomepulido@correo.com',
        password: 'sandy',
    }


    const res= await request(app)
        .post('/users/login')
        .send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('GET /users ', async () => { 
    const res= await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const body = { firstName: 'Sandy updated'}
    const res = await request(app)
        .put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
  });

 test('POST /users/login debe retornar credenciales incorrectas', async () => { 
    const body = {
        email: 'incorrecto@correo.com',
        password: 'incorrecto',
    }
    const res= await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
  });


 test('DELETE /users/:id', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(204);
 });


 