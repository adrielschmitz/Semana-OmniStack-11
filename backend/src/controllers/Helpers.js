const connection = require('../database/connection');
const crypto = require('crypto');

const findById = (column_name = 'incidents', id) => {
  return connection(column_name).where('id', id);
}

const generateUniqueId = () => {
  return crypto.randomBytes(4).toString('HEX');
}

exports.findById = findById;
exports.generateUniqueId = generateUniqueId;