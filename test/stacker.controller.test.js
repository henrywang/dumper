const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
require('sinon-mongoose');

const StackerModel = require('../models/stacker.model');

describe('Stacker API', () => {
  describe('GET /api/v0/stacker/ipaddrs - get ip address of a VM', () => {
    it('should return ip address', (done) => {
      const StackerMock = sinon.mock(StackerModel);
      const expectedResult = { vmName: 'atomic-7.4.1-x86_64-2016-ge1', ipaddr: '10.66.77.88' };
      StackerMock.expects('find').yields(null, expectedResult);
      StackerModel.findOne((err, result) => {
        StackerMock.verify();
        StackerMock.restore();
        expect(result.ipaddr).to.equal('10.66.77.88');
        done();
      });
    });
  });
});
