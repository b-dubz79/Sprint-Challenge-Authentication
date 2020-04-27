const request = require('supertest');

const server = require('../api/server')

const db = require('../database/dbConfig')

describe('POST/register', () => {
    it('should receive 201 response', () => {
        return request(server)
        .post('/api/auth/register')
        .send({ username: Math.random().toString(), password: "test2"})
        .then(res => {
            expect(res.status).toBe(201)
        })
    })
    it('response should include username', () => {
        return request(server)
        .post('/api/auth/register')
        .send({username: Math.random().toString(), password: "test 3"})
        .then(res => {
            expect(res.body).toHaveProperty("username")
        })
    })
})

describe('POST/login', () => {
    it('should receive 200 response', () => {
        return request(server)
        .post('/api/auth/login')
        .send({ username: "bward", password: "well"})
        .then(res => {
            expect(res.status).toBe(200)
        })
    })
    it('response should include message property', () => {
        return request(server)
        .post('/api/auth/login')
        .send({username: "bward", password: "well"})
        .then(res => {
            expect(res.body).toHaveProperty("message")
        })
    })
})

describe('GET/jokes', () => {
    it('expect 401 error without jwt',  () => {
      return request(server)
        .get('/api/jokes')
        .then(res => {
            expect(res.status).toBe(401)
        })
    })
})

describe('GET/jokes', () => {
    let token;

    beforeAll((done) => {
      request(server)
        .post('/api/auth/login')
        .send({
          username: 'bward3',
          password: 'well3'
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });

    it('response should be an array',  () => {
       return request(server)
        .get('/api/jokes')
        .set("Authorization", token)
        .then(res => {
            expect(Array.isArray(res.body)).toBe(true)
            
        })
    })
})



