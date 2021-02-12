const { Pool } = require('pg');
const { ssl } = require('../lib/db');
const dbParams = require('../lib/db');

const pool = new Pool(
  {
    host: 'ec2-52-205-3-3.compute-1.amazonaws.com',
    database: 'dddae6ankpbtav',
    user: 'fvwzazmshaoxsj',
    port: 5432,
    password: '2369b5bbf5de5b2d1472583cecfc1d8cf204bc66162846ca0296c1b7d2553988',
    ssl: false,
  }
);
pool.connect();

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
