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
    const user = req.body;
    database.addAccountToOrg(user)
      .then((user) => {
        if(!user) {
          res.send({error: 'There was an error!'});
          return;
        }
        res.send({ user: { firstName: user.first_name, lastName: user.last_name, email: user.email, id: user.id }}); // Need to
      })
      .catch((err) => console.log(err));
  });
  return router;
};
