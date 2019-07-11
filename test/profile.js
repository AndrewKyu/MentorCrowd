process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Profile = require('../models/Profile');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
// let profile = require('../routes/api/profile');
let should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe('Profile', () => {
    
    describe("/GET profile", () => {
        it("it should GET all profiles", (done) => {
            chai.request(server)
                .get('/api/profile/all')
                .end(function(err, res) {
                    // console.log('this is res');
                    // console.log(res.body);
                    const result = res.statusCode;
                    res.should.have.status(result);
                    res.should.be.json;
                    done();
                });
        });
    });
});

