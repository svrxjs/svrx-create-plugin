const assert = require('assert');

const plugin = require('../index');

describe('<%- packageName %>', () => {
  it('should be a object', () => {
    assert.strictEqual(typeof plugin, 'object');
  });
  // TODO: add more tests
});
