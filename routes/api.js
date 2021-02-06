/*
 * All routes for the api are defined here
 * Since this file is loaded in server.js into /api,
 *   these routes are mounted onto /api
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (database) => {

  // USER //
  router.post("/user", (req, res) => {
    const userId = req.session.userId;
    database.updateUserInfo({...req.body, id: userId})
      .then((user) => {
        res.send(user);
      });
  });

  // ACCOUNTS //
  router.post("/accounts", (req, res) => {
    const orgId = req.session.orgId;
    database.addAccountToOrg({...req.body, org_id: orgId})
      .then((account) => {
        if(!account) {
          res.send({error: 'There was an error!'});
          return;
        }
        res.send(account);
      })
      .catch((err) => console.log(err));
  });

  router.get("/accounts", (req, res) => {
    const orgId = req.session.orgId // NEED TO GET orgId for the current user
    database.getAllAccounts({...req.body, org_id: orgId})
      .then((account) => {
        if(!account) {
          res.send({error: 'There was an error!'});
          return;
        }
        res.send(account);
      })
      .catch((err) => console.log(err));
  });

  router.put('/accounts', (req, res) => {
    const orgId = req.session.orgId;
    // need to make sure that form has a hidden field/button that passes account id to this function
    database.updateAccountInfo({...req.body, org_id: orgId})
      .then(account => {
        res.send(account);
      });
  });

  // GENERATE-PASSWORD //
  router.get('/generate-password', (req, res) => {
    const length = 9 || req.body.length;
    const charAdded = 0;
    const charRemaining = length - charAdded;

    while (charRemaining > 0) {

    }

    // lowercase - generate ran number of lc letters
    // uppercase - generate ran number of uc letters
    // numbers - generate ran number of uc letters
    // symbols - generate ran symbols of uc letters
  });

  // ORGANIZATION //
  router.get('/organization', (req, res) => {

  });

  router.put('/organization', (req, res) => {

  });

  // MANAGE
  router.get('/manage', (req, res) => {

  });

  router.put('/manage', (req, res) => {

  });

  return router;
};
