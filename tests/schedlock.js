const expect = require('chai').expect
const schedlock = require('../lib/schedule-lock.js').schedlock;
const assert = require('assert');

const Lock = new schedlock();

describe('Lock', function() {
  describe('should', function() {
    it('be instance of schedlock', function() {
      expect(Lock).to.be.an.instanceof(schedlock);
    });
  });
});