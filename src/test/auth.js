process.env.NODE_ENV = 'test';

const {
  join
} = require('path');
require('dotenv').config({
  path: join(__dirname, '.env')
})

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:3030/api/v1";
let should = chai.should();
const {
  expect
} = chai;

chai.use(chaiHttp);
//Our parent block
describe('Specifications', () => {
  describe('/GET specifications', () => {
    it('it should GET Specifications', (done) => {
      chai.request(server)
        .get('/specifications/get-meta-data/module/tradeLicense/screen/apply')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Specifications Listed Successfully !')
          res.body.should.have.property('data').be.a('object')
          done();
        });
    });
  });
});
