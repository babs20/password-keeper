/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { addUserToOrg } = require('../server/database');

module.exports = (database) => {
  // user route - send user obj
  // need to add orgId cookie
  router.post('/register', (req, res) => {
    const user = req.body;
    const key = req.body.org_key;
    if (!user.first_name || !user.last_name || !user.email || !user.password || !key) {
      res.send({ emptyErr: "error" });
      return;
    }
    let options = {};
    user.password = bcrypt.hashSync(user.password, 12);

    database.checkOrgExists(key)
      .then(org => {
        if (!org) {
          res.send({ noOrgErr: "error" });
          return;
        } else {
          database.addUser(user)
            .then(user => {
              if (!user) {
                res.send({ error: "error" });
                return;
              }
              req.session.userId = user.id;
              options.userId = user.id;
              return key;
            })
            .then(database.getOrgIdFromKey)
            .then(org => {
              options.orgId = org.id;
              return options;
            })
            .then(database.addUserToOrg)
            .then(relationship => {
              req.session.orgId = relationship.org_id;
              res.send({user: {org: relationship.org_id, id: relationship.user_id}})
            })
            .catch(e => res.send(e));
        }
      })

  });

  const login = function(email, password) {
    return database.getUserWithEmail(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      })
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        req.session.orgId = user.org_id;
        res.send({ user: { firstName: user.first_name, lastName: user.last_name, email: user.email, id: user.id, org: user.org_id }});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    req.session.orgId = null;
    res.send({});
  });

  router.get('/organizations', (req, res) => {
    const userId = req.session.userId;
    database.getOrgsForUser(userId)
      .then(orgs => {
        res.send(orgs)
      });
  });

  return router;
};
