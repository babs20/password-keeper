/*
 * All routes for the api are defined here
 * Since this file is loaded in server.js into /api,
 *   these routes are mounted onto /api
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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
        console.log(user);
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }

        res.send({user: {firstName: user.first_name, lastName: user.last_name, email: user.email, id: userId, org: user.org_id}});
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
    const orgId = req.session.orgId // NEED TO GET orgId for the current user
    database.getAllAccounts({...req.body, org_id: orgId})
      .then((account) => {
        if (!account) {
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

        res.send({org: { name: org.name, abbreviation: org.abbreviation, email: org.email, orgId }});
      })
      .catch(e => res.send(e));
  });

  router.put('/organization', (req, res) => {
    const orgId = req.session.orgId;
    database.updateOrgInfo({...req.body, id: orgId})
      .then(organization => {
        res.send(organization);
      });
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
