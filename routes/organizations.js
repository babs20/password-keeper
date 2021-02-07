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
  router.post('/register', (req, res) => {
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

  const orgLogin = function(email, password) {
    return database.getOrgWithEmail(email)
      .then(org => {
        if (bcrypt.compareSync(password, org.password)) {
          return org;
        }
        return null;
      });
  };
  exports.orgLogin = orgLogin;

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    orgLogin(email, password)
      .then(org => {
        if (!org) {
          res.send({ error: "error" });
          return;
        }
        req.session.orgId = org.id;
        res.send({ org: { name: org.name, abbreviation: org.abbreviation, email: org.email, password: org.password }});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.orgId = null;
    res.send({});
  });

  return router;
};
