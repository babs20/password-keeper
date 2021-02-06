/*
 * All routes for Registration are defined here
 * Since this file is loaded in server.js into registration,
 *   these routes are mounted onto /registration
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (database) => {
  // user route - send user obj
  // need to add orgId cookie
  router.post('/user', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
      })
      .catch(e => res.send(e));
  });

  // organization route
  router.post('/organization', (req, res) => {
    const organization = req.body;
    organization.password = bcrypt.hashSync(organization.password, 12);
    database.addOrganization(organization)
      .then(organization => {
        if (!organization) {
          res.send({ error: "error" });
          return;
        }
        req.session.orgId = organization.id;
      })
      .catch(e => res.send(e));
  });

  return router;
};
