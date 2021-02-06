/*
 * All routes for Organizations are defined here
 * Since this file is loaded in server.js into organizations,
 *   these routes are mounted onto /organizations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (database) => {


  // organization route
  router.post('/registration', (req, res) => {
    const organization = req.body;
    organization.password = bcrypt.hashSync(organization.password, 12);
    database.addOrganization(organization)
      .then(organization => {
        if (!organization) {
          res.send({ error: "error" });
          return;
        }
        req.session.orgId = organization.id;
        res.send('Worked');
      })
      .catch(e => res.send(e));
  });

  return router;
};
