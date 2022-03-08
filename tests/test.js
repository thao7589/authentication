const expect = require('chai').expect;
const req = require('supertest');
const app = require('../routes/auth');
const conn = require('../index');

describe('POST /login', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    });

    after((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    });

    it('OK, creating a new user', (done) => {
        request(app).post('/login')
        .send({user_id: "ThaoLeTest", "password": "PaSSwd4TY"})
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('user_id');
            expect(body).to.contain.property('password');
            expect(body).to.contain.property('nickname');
            expect(body).to.contain.property('comment');
            done();
        })
        .catch((err) => done(err))
    });
});