const db = require('./index');

const getUserWithEmail = function(email) {
  return db.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email])
    .then(res => res.rows[0]);
};
