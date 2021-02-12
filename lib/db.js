let dbParams = {};
const parse = require('pg-connection-string').parse;

if (process.env.DATABASE_URL) {
  dbParams.connectionString = parse(process.env.DATABASE_URL);
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}
module.exports = dbParams;
