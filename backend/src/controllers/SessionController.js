const { find_by_id } = require('./Helpers');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await find_by_id('ongs', id).select('name').first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(ong);
  },
};
