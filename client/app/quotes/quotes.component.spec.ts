//import * as chai from 'chai';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';


import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../../../server/app';
import Quote from '../../../server/models/quote';

chai.use(chaiHttp);

describe('Quotes', () => {

  beforeEach(done => {
    Quote.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for quotes', () => {

    it('should get all the quotes', done => {
      chai.request(app)
        .get('/api/quotes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get quotes count', done => {
      chai.request(app)
        .get('/api/quotes/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new quote', done => {
      const quote = new Quote({ name: 'Fluffy', weight: 4, age: 2, rate:3 });
      chai.request(app)
        .post('/api/quote')
        .send(quote)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('gallons_requested');
          res.body.should.have.a.property('delivery_address');
          res.body.should.have.a.property('delivery_date');
          res.body.should.have.a.property('suggested_price');
          res.body.should.have.a.property('total_amount');
          done();
        });
    });

    it('should get a quote by its id', done => {
      const quote = new Quote({ name: 'Quote', weight: 2, age: 4, rate:3 });
      quote.save((error, newQuote) => {
        chai.request(app)
          .get(`/api/quote/${newQuote.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.a.property('gallons_requested');
          res.body.should.have.a.property('delivery_address');
          res.body.should.have.a.property('delivery_date');
          res.body.should.have.a.property('suggested_price');
          res.body.should.have.a.property('total_amount');
            res.body.should.have.property('_id').eql(newQuote.id);
            done();
          });
      });
    });

    it('should update a quote by its id', done => {
      const quote = new Quote({ gallons_requested: 5, delivery_address: 'addr', delivery_date: '4', suggested_price:5 ,total_amount:10});
      quote.save((error, newQuote) => {
        chai.request(app)
          .put(`/api/quote/${newQuote.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a quote by its id', done => {
      const quote = new Quote({ gallons_requested: 5, delivery_address: 'addr', delivery_date: '4', suggested_price:5 ,total_amount:10 });
      quote.save((error, newQuote) => {
        chai.request(app)
          .del(`/api/quote/${newQuote.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


