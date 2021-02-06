/*
 * All routes for the api are defined here
 * Since this file is loaded in server.js into /api,
 *   these routes are mounted onto /api
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.post("/user", (req, res) => {
    const userId = req.session.userId;
    database.updateUserInfo(userId)
      .then((user) => {
        res.send(user);
      });
  });

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
    const orgId = req.session.userId; // NEED TO GET orgId for the current user
    // account_type_id
    // date created

    database.getAllAccounts(...req.body, orgId)
      .then((account) => {
        if(!account) {
          res.send({error: 'There was an error!'});
          return;
        }
        res.send(account);
      })
      .catch((err) => console.log(err));
  });
  return router;
};
