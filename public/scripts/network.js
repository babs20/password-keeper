const userLogin = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/login',
    data
  });
};

const userLogout = function() {
  return $.ajax({
    method: 'POST',
    url: '/users/logout'
  });
};

const userRegistration = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/register',
    data
  });
};

const getUserOrgs = function() {
  return $.ajax({
    url: '/users/organizations'
  });
};

const joinOrg = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/join',
    data
  });
};

const authenticateUser = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/users/authenticate',
    data
  });
};

const orgLogin = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/organizations/login',
    data
  });
};

const orgRegistration = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/organizations/register',
    data
  });
};

const getUserInfo = function() {
  return $.ajax({
    url: '/api/user'
  });
};

const editUserInfo = function(data) {
  return $.ajax({
    method: 'PUT',
    url: '/api/user',
    data
  });
};

const deleteUser = function() {
  return $.ajax({
    method: 'DELETE',
    url: '/api/user'
  });
};

const createAccount = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/api/accounts',
    data
  });
};

const getAllAccounts = function(params) {
  let url = '/api/accounts';
  if (params) {
    url += '?' + params;
  }
  return $.ajax({
    url
  });
};

const editAccount = function(data) {
  return $.ajax({
    method: 'PUT',
    url: '/api/accounts',
    data
  });
};

const deleteAccount = function(data) {
  return $.ajax({
    method: 'DELETE',
    url: '/api/accounts',
    data
  });
};

const generatePassword = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/api/generate-password',
    data
  });
};

const getOrgInfo = function() {
  return $.ajax({
    url: '/api/organization'
  });
};

const editOrgInfo = function(data) {
  return $.ajax({
    method: 'PUT',
    url: '/api/organization',
    data
  });
};

const deleteOrg = function() {
  return $.ajax({
    method: 'DELETE',
    url: '/api/organization'
  });
};

const getUsersInOrg = function() {
  return $.ajax({
    url: '/api/manage'
  });
};

const removeUserFromOrg = function(data) {
  return $.ajax({
    method: 'DELETE',
    url: '/api/manage',
    data
  });
};
