const db = require('./index');

/**
 * Get a user from the database given their email
 * @param {String} email
 */
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
 * Generate identifier key for organization
 * @param null
 */

const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
};

/**
 * Add organization to database with given information
 * @param {Object} organization
 */

const addOrganization = function(organization) {
  const identifierKey = organization.abbreviation + generateRandomString();
  const query = `
    INSERT INTO organizations (name, abbreviation, email, password, identifier_key)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const queryParams = [organization.name, organization.abbreviation, organization.email, organization.password, identifierKey];
  return db.query(query, queryParams)
    .then(res => res.rows[0]);
};
exports.addOrganization = addOrganization;

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
   * Add account to specific organization on the database with given information
   * @param {Object} params contains all account info including org_id
**/
const addAccountToOrg = (params) => {
  const query = `
  INSERT INTO accounts (name, password, website, account_type_id, org_id, creation_date)
  VALUES ($1, $2, $3, $3, $4, $5, NOW()::timestamp)
  RETURNING *;`
  return db.query(query, [
    params.name,
    params.password
    params.website,
    params.account_type_id,
    params.org_id
  ])
    .then((res) => res.rows[0])
    .catch((err) => console.log(err));
};
exports.addAccountToOrg = addAccountToOrg;

/**
   * Get all accounts for the org based on filters
   * @param {Object} options contains all account info including org_id
**/
const getAllAccounts = (options) => {
  const query = `
  SELECT *
  FROM accounts`

  return db.query(query, [])
    .then((res) => res.rows[0])
    .catch((err) => console.log(err));
};
exports.getAllAccounts = getAllAccounts;
