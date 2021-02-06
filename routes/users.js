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
  const login = function(email, password) {
    return database.getUserWithEmail(email)
      .then(user => {
        bcrypt.compare(password, user.password)
          .then(res => {
            if (res) {
              return user;
            }
            return null;
          })
      });
  }
  exports.login = login;

  // need to add a orgId cookie when logging in
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send({ user: { firstName: user.first_name, lastName: user.last_name, email: user.email, id: user.id }});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  return router;
};
