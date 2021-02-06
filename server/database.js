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
   * Update user in database with given information
   * @param {Object} user updated user info
**/
const updateUserInfo = (user) => {
  const hashedPassword = bcrypt.hashSync(user.password, 12);
  const query = `
  UPDATE users
  SET first_name = $1,
      last_name = $2,
      email = $3,
      password = $4
  WHERE id = $5;`
  return db.query(query, [user.first_name, user.last_name, user.email, hashedPassword])
    .then((res) => res.rows[0])
    .catch((err) => console.log(err));
};
exports.updateUserInfo = updateUserInfo;

/**
   * Add account to specific organization on the database with given information
   * @param {Object} params contains all account info including org_id
**/
const addAccountToOrg = (params) => {
  const query = `
  INSERT INTO accounts (name, password, website, account_type_id, org_id, creation_date)
  VALUES ($1, $2, $3, $4, $5, NOW()::timestamp)
  RETURNING *;`
  return db.query(query, [
    params.name,
    params.password,
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
   * @param {Object} options account_type_id and timestamp
**/
const getAllAccounts = (options) => {
  const queryParams = [options.org_id];

  let query = `
  SELECT *
  FROM accounts
  WHERE org_id = $1`

  if (options.account_type_id) {
    queryParams.push(options.account_type_id);
    query += ` AND account_type_id = ${queryParams.length}`;
  }

  if (options.website) {
    queryParams.push(options.search);
    query += ` AND website LIKE '%${queryParams.length}%'`;
  }

  if (options.creation_date) {
    queryParams.push(options.creation_date);
    query += ` ORDER BY creation_date = ${queryParams.length}`;
  }

  query += ';';

  return db.query(query, queryParams)
    .then((res) => res.rows) // array of all the account objs
    .catch((err) => console.log(err));
};
exports.getAllAccounts = getAllAccounts;
