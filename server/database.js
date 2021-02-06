const db = require('./index');

const getUserWithEmail = function(email) {
  return db.query(`
    SELECT * FROM users
    WHERE email = $1;
  `, [email])
    .then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;


/**
   * Add user to database with given information
   * @param {Object} user
**/
const addUser = (user) => {
  const query = `
  INSERT INTO users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`
  return db.query(query, [user.first_name, user.last_name, user.email, user.password])
    .then((res) => res.rows[0])
    .catch();
};
exports.addUser = addUser;

/**
   * Add user to database with given information
   * @param {String} userId
**/
const getUserInfo = (userId) => {
  const query = `
  SELECT *
  FROM users
  WHERE id =$1;`
  return db.query(query, [userId])
    .then((res) => res.rows[0])
    .catch((err) => console.log(err));
};
exports.getUserInfo = getUserInfo;

/**
   * Add user to database with given information
   * @param {Object} options
**/
const addAccountToOrg = (options, orgId) => {
  const query = `
  INSERT INTO accounts (name, password, website, account_type_id, org_id, creation_date)
  VALUES ($1, $2, $3, $3, $4, $5, $6)
  RETURNING *;`
  return db.query(query, [userId])
    .then((res) => res.rows[0])
    .catch((err) => console.log(err));
};
exports.getUserInfo = getUserInfo;
