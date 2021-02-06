const { Pool } = require('pg');
const dbParams = require('../lib/db');

const pool = new Pool(dbParams);

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },

  connect: () => {
    return pool.connect();
  }
};
