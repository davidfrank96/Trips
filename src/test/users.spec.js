/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const UserController = require('../controllers/user');

const should = chai.should();
chai.use(chaiHttp);

describe('Testing Users', () => {
  it('User Controller should exist', () => {
    UserController.should.exist;
  });
});

describe('Testing UserController Methods', () => {
  it('createUser(POST) method should exist', () => {
    UserController.createUser.should.exist;
  });

  it('POST-Sign Up should create a new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        firstName: 'test',
        lastName: 'test',
        password: 'pass_test',
      })
      .end((err, res) => {
        // console.log(err, res);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.have.property('status');
        res.body.should.be.have.property('data');
        res.body.status.should.equal(201);
        res.body.data.should.be.a('object');
      });
    done();
  });
});
