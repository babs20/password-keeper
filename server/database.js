const db = require('./index');

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
      case params.symbols && charChoice === 3:
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

/**
 * Update account in database with given information
 * @param {Object} account
 */

const updateAccountInfo = function(account) {
  const hashedPassword = bcrypt.hashSync(account.password, 12);
  const query = `
    UPDATE accounts
    SET name = $1,
        password = $2,
        website = $3,
        account_type_id = $4
    WHERE id = $5 AND org_id = $6;
  `;
  const queryParams = [account.name, hashedPassword, account.website, account.account_type_id, account.id, account.org_id];
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
    SELECT *
    FROM users_organizations
    WHERE org_id = $1;
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

const deleteUserOfOrg = function(user) { //maybe actually delete relationship in middle table. will fix after lunch
  const query = `
    UPDATE user
    SET is_deleted = TRUE
    WHERE id = $1 AND org_id = $2;
  `;
  return db.query(query, [user.id, user.org_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};
exports.deleteUserOfOrg = deleteUserOfOrg;

