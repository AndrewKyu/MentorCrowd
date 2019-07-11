process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../server');
const User = require('../models/User');

var should = chai.should();
chai.use(chaiHttp);

// describe('Server', function(){
//     it('app running on localhost: 5000', function(){
//         assert.equal(server(), 'what it should return');
//     })
// })

describe('User', function(){

    it('should register a new user on /users POST', function(done){
        chai.request(server)
            .post('/api/users/register')
            .send({'name': 'Bob Kyu', 'email': 'test@test.com', 'password': 'testtest', 'password2': 'testtest'})
            .end(function(err, res){
                // console.log(res);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.should.have.property('email');
                res.body.SUCCESS.should.have.property('password');
                res.body.SUCCESS.should.have.property('_id');
                res.body.SUCCESS.name.should.equal('Bob Kyu');
                res.body.SUCCESS.email.should.equal('test@test.com');
                // res.body.SUCCESS.password.should.equal('testtest');
                done();
            })
    })
})