let dbParams = {};
const parse = require('pg-connection-string').parse;


dbParams = parse('postgres://fvwzazmshaoxsj:2369b5bbf5de5b2d1472583cecfc1d8cf204bc66162846ca0296c1b7d2553988@ec2-52-205-3-3.compute-1.amazonaws.com:5432/dddae6ankpbtav');
dbParams.ssl = 'true';
// if (process.env.DATABASE_URL) {

// } else {
//   dbParams = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   };
// }

module.exports = dbParams;
