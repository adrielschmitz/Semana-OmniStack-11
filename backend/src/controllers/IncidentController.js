const connection = require('../database/connection');
const { findById } = require('./Helpers');

module.exports = {
  async index(request, response) {
    const { page = 1, results = 5 } = request.query;

    const [total_count] = await connection('incidents').count();
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(results)
      .offset((page - 1) * results)
      .select([
        'incidents.*',
        'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'
      ]);

    response.header('X-Total-Count', total_count['count(*)'])
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await findById('incidents', id).select('ong_id').first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation  not permitted. ' });
    }

    await findById('incidents', id).delete();

    return response.status(204).send();
  }
};
