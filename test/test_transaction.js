'use strict';

// NOTE: specify your own config file...
// It must contains merchantId, clientKey, serverKey, and url.
const expect = require('chai').expect;
const Veritrans = require('../');
const utils = require('../lib/utils');
const config = require('../config.json');

const vt = new Veritrans(config);

// Change the values with your transaction ids,
const validTransactIds = [
    'Sample Order-1',
    'Sample Order-2',
];

describe('lib/vt/transaction.js', function() {
    this.timeout(30000);

    describe('status(id, callback)', () => {
        it('Should carry error if using invalid order id', done => {
            vt.transaction.status('notavalidId', (err, body) => {
                expect(err).not.to.be.null;
                expect(body).to.be.undefined;
                return done();
            });
        });

        it('Should carry results if using valid id', done => {
            vt.transaction.status(validTransactIds[0], (err, body) => {
                expect(err).to.be.nulll
                expect(body).not.to.be.empty;

                return done();
            });
        });
    });

    describe('charge(payload, callback) on credit card', () => {
        it('Should carry error if transaction_details fields are missing', done => {
            const payload = {
                payment_type: 'credit_card',
                credit_card: {
                    token_id: 'Some token',
                    bank: 'bni',
                },
            };

            vt.transaction.charge(payload, (err, body) => {
                expect(err).not.to.be.null;
                expect(body).to.be.undefined;

                return done();
            });
        });

        it('Should carry error if credit_card fields are missing', done => {
            const payload = {
                payment_type: 'credit_card',
                transaction_details: {
                    order_id: 'some order',
                    gross_amount: 25000
                },
            };

            vt.transaction.charge(payload, (err, body) => {
                expect(err).not.to.be.null;
                expect(body).to.be.undefined;

                return done();
            });
        });
    });

    describe('approve(id, callback)', () => {
        it('Should carry error if using invalid id', done => {
            vt.transaction.approve('notavalidId', (err, body) => {
                expect(err).not.to.be.null;
                expect(body).to.be.undefined;

                return done();
            });
        });

        it('Should carry result if using valid id', done => {
            vt.transaction.approve(validTransactIds[0], (err, body) => {
                expect(err).to.be.null;
                expect(body).not.to.be.undefined;
                expect(body).to.be.an('object');
            });
        });
    });
});