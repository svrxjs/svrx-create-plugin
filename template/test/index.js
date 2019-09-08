const chai = require('chai');

const {
  assets = {},
} = require('../index');

chai.use(require('chai-json-schema'));

const { assert } = chai;

const assetsSchema = {
  title: 'assets schema',
  type: 'object',
  properties: {
    test: {
      type: 'boolean',
    },
    script: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
    style: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
  },
};

describe('Format', () => {
  it('assets schema', () => {
    assert.jsonSchema(assets, assetsSchema);
  });
  // TODO: add more tests
});
