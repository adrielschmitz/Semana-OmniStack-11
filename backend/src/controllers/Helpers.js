const connection = require('../database/connection');

const find_by_id = (column_name = 'incidents', id) => {
  return connection(column_name).where('id', id);
}

exports.find_by_id = find_by_id;