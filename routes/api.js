/*
 * All routes for the api are defined here
 * Since this file is loaded in server.js into /api,
 *   these routes are mounted onto /api
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/user", (req, res) => {
    const userId = req.body.id;
    database.getUserInfo(userId)
      .then((user) => {
        res.send(JSON.stringify(user));
      });
  });

  router.post("/accounts", (req, res) => {
    const account = req.body;
    database.addAccountToOrg(account)
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
