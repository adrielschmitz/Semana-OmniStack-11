const { generateUniqueId } = require('../../src/controllers/Helpers');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId();


    expect(id).toHaveLength(8);
  });
});