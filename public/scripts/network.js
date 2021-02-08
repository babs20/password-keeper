// const getHomepage = function() {
//   return $.ajax({
//     url: '/',
//   });
// };

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

const orgLogin = function(data) {
  return $.ajax({
    method: 'POST',
    url: '/organizations/login',
    data
  });
};

// const orgLogout = function() {
//   return $.ajax({
//     method: 'POST',
//     url: '/organizations/logout'
//   });
// };

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

const deleteAccount = function() {
  return $.ajax({
    method: 'DELETE',
    url: '/api/accounts'
  });
};

// const getGeneratePassword = function() {
//   return $.ajax({
//     url: '/api/generate-password'
//   });
// };

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
