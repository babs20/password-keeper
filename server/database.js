const db = require('./index');

const getUserWithEmail = function(email) {
  return db.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email])
    .then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

const addUser = (user) => {
  const query = `
  INSERT INTO organizations (name, abbreviation, email, password, identifier_key)
  VALUES ($1, $2, $3, $3, $4)
  RETURNING *;`
  return db.query(query, [user.name, user.abbr])
    .then((res) => res)
    .catch();
};
exports.addUser = addUser;

const getUserInfo = (user) => {
  const query = `
  INSERT INTO organizations (name, abbreviation, email, password, identifier_key)
  VALUES ($1, $2, $3, $3, $4)
  RETURNING *;`
  return db.query(query, [user.name, user.abbr])
    .then((res) => res)
    .catch();
};
exports.addUser = addUser;
