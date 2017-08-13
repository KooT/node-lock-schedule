const expect = require('chai').expect
const schedlock = require('../lib/schedlock.js').schedlock;
const assert = require('assert');

const SchLock = new schedlock();

describe('SchLock', function() {
  describe('should', function() {
    it('be instance of schedlock', function() {
      expect(SchLock).to.be.an.instanceof(schedlock);
    });
  });
});