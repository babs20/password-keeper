/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (database) => {
  // user route - send user obj
  // need to add orgId cookie
  router.post('/register', (req, res) => {
    const user = req.body;
    const key = req.body.org_key;

    let options = {};
    user.password = bcrypt.hashSync(user.password, 12);

    database.getUserWithEmail(user.email)
    .then(userExists => {
      if (userExists) {
        res.send({userExistsErr: "error"});
        return;
      } else {
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
    req.session.cipher = null;
    res.send({});
  });

  router.get('/organizations', (req, res) => {
    const userId = req.session.userId;
    database.getOrgsForUser(userId)
      .then(orgs => {
        res.send(orgs)
      });
  });

  router.post('/join', (req, res) => {
    const userId = req.session.userId;
    database.getOrgIdFromKey(req.body.identifier_key)
      .then(org => {
        if (!org) {
          res.send({orgKeyErr: "error"});
          return;
        } else {
          const orgId = org.id;
          database.checkUserJoinedOrg({ orgId, userId })
            .then(relationship => {
              if (relationship) {
                console.log('joined')
                res.send({orgJoinedErr: "error"});
              } else {
                database.addUserToOrg({ userId, orgId })
                .then(userJoinOrg=> {
                  req.session.orgId = userJoinOrg.org_id;
                  res.send(userJoinOrg);
                });
              }
            });
        }
      });
  });

  router.post('/authenticate', (req, res) => {
    if (req.session.cipher) {
      res.send({authenticated: "authenticated"})
      return;
    } else if (!req.session.cipher) {
      res.send({ err: "error" });
      return;
    } else {
      const orgId = req.session.orgId;
      database.getMasterPassword(orgId)
        .then(masterPassword => {
          if (!bcrypt.compareSync(req.body.master_password, masterPassword.master_password)) {
            res.send({ masterPassErr: "error" });
          } else {
            req.session.cipher = req.body.master_password;
            res.send('Success!');
          }
        })
    }
  });

  return router;
};
