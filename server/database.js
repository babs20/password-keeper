const db = require('./index');
const bcrypt = require('bcrypt');

const ranNum = (max) => {
  return Math.floor(Math.random() * max);
};

/**
 * Generate random password
 * @param {Object} params
 */
const generatePass = (params) => {
  let finalPass = '';
  let charAdded = 0;

  const lc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const uc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const sym = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '[', '}', ']', '|', ':', ';', '<', '>', '.', '?', '/'];

  while (params.length > charAdded) {
    let charChoice = ranNum(5);
    switch (true) {
      case params.lc && charChoice === 0:
        finalPass += lc[ranNum(lc.length)];
        charAdded += 1;
        break;
      case params.uc && charChoice === 1:
        finalPass += uc[ranNum(uc.length)];
        charAdded += 1;
        break;
      case params.num && charChoice === 2:
        finalPass += num[ranNum(num.length)];
        charAdded += 1;
        break;
      case params.sym && charChoice === 3:
        finalPass += sym[ranNum(sym.length)];
        charAdded += 1;
        break;
    }
  }
  return finalPass;
};
exports.generatePass = generatePass;

/**
 * Get a user from the database given their email
 * @param {String} email
 */
const getUserWithEmail = function(email) {
  return db.query(`
    SELECT users.*, users_organizations.org_id AS org_id
    FROM users
    JOIN users_organizations ON users.id = user_id
    WHERE email = $1 AND users.is_deleted = FALSE
    LIMIT 1;
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
  return db.query(query, [user.first_name, user.last_name, user.email, hashedPassword, user.id])
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
  const queryParams = [options.org_id]
  const websiteParam = `%${options.website}%`
  let query = `
  SELECT *
  FROM accounts
  WHERE org_id = $1
  AND is_deleted = FALSE`

  if (options.id) {
    queryParams.push(options.id);
    query += ` AND id = $${queryParams.length}`;
  }

  if (options.account_type_id) {
    queryParams.push(options.account_type_id);
    query += ` AND account_type_id = $${queryParams.length}`;
  }

  if (options.website) {
    queryParams.push(websiteParam);
    query += ` AND website LIKE $${queryParams.length}`;
  }

  if (options.creation_date) {
    queryParams.push(options.creation_date);
    query += ` ORDER BY creation_date = $${queryParams.length}`;
  }

  query += ';';

  return db.query(query, queryParams)
    .then((res) => res.rows) // array of all the account objs
    .catch((err) => console.log(err));
};
exports.getAllAccounts = getAllAccounts;

/**
 * Update account in database with given information
 * @param {Object} account
 */

const updateAccountInfo = function(account) {
  const query = `
    UPDATE accounts
    SET name = $1,
        password = $2,
        website = $3,
        account_type_id = $4
    WHERE id = $5 AND org_id = $6;
  `;
  const queryParams = [account.name, account.password, account.website, account.account_type_id, account.id, account.org_id];
  return db.query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
exports.updateAccountInfo = updateAccountInfo;

/**
 * Update organization in database with given information
 * @param {Object} organization
 */

const updateOrgInfo = function(organization) {
  const hashedPassword = bcrypt.hashSync(organization.password, 12);
  const query = `
    UPDATE organizations
    SET name = $1,
        abbreviation = $2,
        email = $3,
        password = $4
    WHERE id = $5;
  `;
  const queryParams = [organization.name, organization.abbreviation, organization.email, hashedPassword, organization.id];
  return db.query(query, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
exports.updateOrgInfo = updateOrgInfo;

/**
 * Set user to deleted
 * @param {Number} userId
 */

const deleteUserInfo = function(userId) {
  const query = `
    UPDATE users
    SET is_deleted = TRUE
    WHERE id = $1;
  `;
  return db.query(query, [userId])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
exports.deleteUserInfo = deleteUserInfo;

/**
 * Set an account to deleted
 * @param {Object} account
 */

const deleteAccount = function(account) {
  const query = `
    UPDATE accounts
    SET is_deleted = TRUE
    WHERE id = $1 AND org_id = $2;
  `;
  return db.query(query, [account.id, account.org_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
exports.deleteAccount = deleteAccount;

/**
 * Get users for a specific organization
 * @param {String} orgId
 */

const getUserOfOrg = function(orgId) {
  const query = `
    SELECT users.first_name, users.last_name, users.email, users.id AS userId
    FROM users_organizations
    JOIN users ON user_id = users.id
    WHERE org_id = $1
    AND users_organizations.is_deleted = FALSE;
  `;
  return db.query(query, [orgId])
    .then(res => res.rows)
    .catch(err => console.log(err));
};
exports.getUserOfOrg = getUserOfOrg;

/**
 * Delete user for a specific organization
 * @param {Object} user
 */

const deleteUserOfOrg = function(user) {
  const query = `
    UPDATE users_organizations
    SET is_deleted = TRUE
    WHERE user_id = $1 AND org_id = $2;
  `;
  return db.query(query, [user.user_id, user.org_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
exports.deleteUserOfOrg = deleteUserOfOrg;

/**
 * Get an org from the database given their email
 * @param {String} email
 */
const getOrgWithEmail = function(email) {
  return db.query(`
    SELECT * FROM organizations
    WHERE email = $1
    AND is_deleted = FALSE;
  `, [email])
    .then(res => res.rows[0]);
};
exports.getOrgWithEmail = getOrgWithEmail;

/**
 * Get a user with given user id
 * @param {Number} obj
 */

const getUserWithId = function(userId) {
  return db.query(`
    SELECT users.*, org_id
    FROM users_organizations
    JOIN users ON user_id = users.id
    WHERE users_organizations.user_id = $1
    LIMIT 1;
  `, [userId])
    .then(res => res.rows[0]);
};
exports.getUserWithId = getUserWithId;

/**
 * Get an organization with given org id
 * @param {Number} orgId
 */

const getOrgWithId = function(orgId) {
  return db.query(`
    SELECT * FROM organizations
    WHERE id = $1
  `, [orgId])
    .then(res => res.rows[0]);
};
exports.getOrgWithId = getOrgWithId;

/**
 * Get all of a user's organizations
 * @param {Number} userId
 */

const getOrgsForUser = function(userId) {
  const query = `
    SELECT organizations.abbreviation AS abbreviation, org_id
    FROM users_organizations
    JOIN organizations ON org_id = organizations.id
    WHERE user_id = $1;
  `;
  return db.query(query, [userId])
    .then(res => res.rows);
};
exports.getOrgsForUser = getOrgsForUser;

/**
 * Get all of a user's organizations
 * @param {Number} userId
 */

const getOrgIdFromKey = function(orgKey) {
  const query = `
    SELECT id
    FROM organizations
    WHERE identifier_key = $1;
  `;
  return db.query(query, [orgKey])
    .then(res => res.rows[0]);
};
exports.getOrgIdFromKey = getOrgIdFromKey;

/**
 * Get all of a user's organizations
 * @param {Number} userId
 */

const addUserToOrg = function(options) {
  const query = `
    INSERT INTO users_organizations(user_id, org_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  return db.query(query, [options.userId, options.orgId])
    .then(res => res.rows[0]);
};
exports.addUserToOrg = addUserToOrg;

/**
 * Check if an organization exists with a given org key
 * @param {String} orgKey
 */

const checkOrgExists = function(orgKey) {
  const query = `
    SELECT * FROM organizations
    WHERE identifier_key = $1;
  `;
  return db.query(query, [orgKey])
    .then(res => res.rows[0]);
}
exports.checkOrgExists = checkOrgExists;

/**
 * Set an organization is_deleted to true with a given orgId
 * @param {number} orgId
 */

const deleteOrg = function(orgId) {
  const query = `
    UPDATE organizations
    SET is_deleted = TRUE
    WHERE id = $1;
  `;
  return db.query(query, [orgId])
    .then(res => res.rows[0]);
};
exports.deleteOrg = deleteOrg;

/**
 * Checks if a user is already apart of an organization
 * @param {Object} options
 */

const checkUserJoinedOrg = function(options) {
  const query = `
    SELECT *
    FROM users_organizations
    WHERE user_id = $1
    AND org_id = $2
    AND is_deleted = FALSE;
  `;
  return db.query(query, [options.userId, options.orgId])
    .then(res => res.rows[0]);
};
exports.checkUserJoinedOrg = checkUserJoinedOrg;
