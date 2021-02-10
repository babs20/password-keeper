/*
 * All routes for the api are defined here
 * Since this file is loaded in server.js into /api,
 *   these routes are mounted onto /api
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const aes256 = require('aes256');
const bcrypt = require('bcrypt');

module.exports = (database) => {

  // USER //
  router.get('/user', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }

        res.send({user: {firstName: user.first_name, lastName: user.last_name, email: user.email, id: userId, org: req.session.orgId}});
      })
      .catch(e => res.send(e));
  });

  router.put("/user", (req, res) => {
    const userId = req.session.userId;
    database.updateUserInfo({...req.body, id: userId})
      .then((user) => {
        res.send(user);
      });
  });

  router.delete('/user', (req, res) => {
    const userId = req.session.userId;
    database.deleteUserInfo(userId)
      .then(user => {
        res.send(user);
      });
  });

  // ACCOUNTS //
  router.post("/accounts", (req, res) => {
    const orgId = req.session.orgId;
    const cipher = req.session.cipher;
    req.body.password = aes256.encrypt(cipher, req.body.password);
    database.addAccountToOrg({...req.body, org_id: orgId})
      .then((account) => {
        if (!account) {
          res.send({error: 'There was an error!'});
          return;
        }
        res.send(account);
      })
      .catch((err) => console.log(err));
  });

  router.get("/accounts", (req, res) => {
    const cipher = req.session.cipher;

    if (req.query.organization) {
      req.session.orgId = req.query.organization;
    }

    const orgId = req.session.orgId // NEED TO GET orgId for the current user
    database.getAllAccounts({...req.query, org_id: orgId})
      .then((accounts) => {
        if (!accounts) {
          res.send({error: 'There was an error!'});
          return;
        }
        for (const account of accounts) {
          account.password = aes256.decrypt(cipher, account.password);
        }
        res.send(accounts);
      })
      .catch((err) => console.log(err));
  });

  router.put('/accounts', (req, res) => {
    const orgId = req.session.orgId;
    const cipher = req.session.cipher;
    req.body.password = aes256.encrypt(cipher, req.body.password);
    // need to make sure that form has a hidden field/button that passes account id to this function
    database.updateAccountInfo({...req.body, org_id: orgId})
      .then(account => {
        res.send(account);
      });
  });

  router.delete('/accounts', (req, res) => {
    const orgId = req.session.orgId;
    // need to make sure that delete button sends a value for the account id to be deleted
    database.deleteAccount({...req.body, org_id: orgId})
      .then(account => res.send(account));
  });

  // GENERATE-PASSWORD //
  router.post('/generate-password', (req, res) => {
    // choices for generated password as an obj i.e. lowercase, uppercase, etc.
    // EXAMPLE: {length: num, lc: boolean, uc: boolean, num: boolean, sym: boolean}
    const options = req.body;
    const password = database.generatePass(options);
    res.send(password);
  });

  // ORGANIZATION //
  router.get('/organization', (req, res) => {
    const orgId = req.session.orgId;
    if (!orgId) {
      res.send({ message: "not logged in" });
      return;
    }

    database.getOrgWithId(orgId)
      .then(org => {
        if (!org) {
          res.send({ error: "no org with that id" });
          return;
        }

        res.send({org: { name: org.name, abbreviation: org.abbreviation, email: org.email, orgId, key: org.identifier_key }});
      })
      .catch(e => res.send(e));
  });

  router.put('/organization', (req, res) => {
    const orgId = req.session.orgId;
    const email = req.body.email;

    database.getOrgWithEmail(email)
      .then(org => {
        if (!bcrypt.compareSync(req.body.current_master_password,org.master_password)) {
          res.send({ incorrectMasterPassErr: "error" })
        } else if (req.body.current_master_password === req.body.new_master_password) {
          database.updateOrgInfo({...req.body, id: orgId})
          .then(organization => {
            res.send(organization);
          });
        } else {
          const oldCipher = req.session.cipher;
          const newCipher = req.body.new_master_password;
          req.session.cipher = req.body.new_master_password;
          database.getAllAccounts({org_id: orgId})
            .then(accounts => {
              for (const account of accounts) {
                const oldPassword = aes256.decrypt(oldCipher, account.password);
                const newPassword = aes256.encrypt(newCipher, oldPassword);
                database.updateAccountPassword({ id: account.id, password: newPassword })
                  .then(() => console.log('update success'))
              }
              database.updateOrgInfo({...req.body, id: orgId})
              .then(organization => {
                res.send(organization);
              });
            })
        }
      })
  });

  router.delete('/organization', (req, res) => {
    const orgId = req.session.orgId;
    database.deleteOrg(orgId)
      .then(() => {
        res.send('Deleted');
      })
  });

  // MANAGE
  router.get('/manage', (req, res) => {
    const orgId = req.session.orgId;
    database.getUserOfOrg(orgId)
      .then(users => {
        res.send(users);
      })
      .catch(err => console.log(err));
  });

  router.delete('/manage', (req, res) => {
    const org_id = req.session.orgId;
    database.deleteUserOfOrg({...req.body, org_id})
      .then(users => {
        res.send(users);
      })
      .catch(err => console.log(err));
  });

  return router;
};
