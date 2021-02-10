/*
 * All routes for Organizations are defined here
 * Since this file is loaded in server.js into organizations,
 *   these routes are mounted onto /organizations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const aes256 = require('aes256');

module.exports = (database) => {
  router.post('/register', (req, res) => {
    const organization = req.body;
    const email = req.body.email;
    const cipher = aes256.createCipher(organization.master_password);

    organization.master_password = bcrypt.hashSync(organization.master_password, 12);
    organization.password = bcrypt.hashSync(organization.password, 12);

    database.getOrgWithEmail(email)
      .then(org => {
        if (org) {
          res.send({orgExistsErr: "error"});
          return;
        } else {
          database.addOrganization(organization)
          .then(organization => {
            if (!organization) {
              res.send({ error: "error" });
              return;
            }
            req.session.orgId = organization.id;
            req.session.cipher = cipher;
            res.send('Worked');
          })
          .catch(e => res.send(e));
        }
      })
  });

  const orgLogin = function(email, password, masterPassword) {
    return database.getOrgWithEmail(email)
      .then(org => {
        if (bcrypt.compareSync(password, org.password) && bcrypt.compareSync(masterPassword, org.master_password)) {
          return org;
        }
        return null;
      });
  };
  exports.orgLogin = orgLogin;

  router.post('/login', (req, res) => {
    const { email, password, master_password } = req.body;
    const cipher = aes256.createCipher(req.body.master_password);
    orgLogin(email, password, master_password)
      .then(org => {
        if (!org) {
          res.send({ error: "error" });
          return;
        }
        req.session.orgId = org.id;
        req.session.cipher = cipher;
        res.send({ org: { name: org.name, abbreviation: org.abbreviation, email: org.email, id: org.id }});
      })
      .catch(e => res.send(e));
  });

  // router.post('/logout', (req, res) => {
  //   req.session.orgId = null;
  //   res.send({});
  // });

  return router;
};
