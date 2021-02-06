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
  router.post('/registration', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send('Worked');
      })
      .catch(e => res.send(e));
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
        res.send({ user: { firstName: user.first_name, lastName: user.last_name, email: user.email, id: user.id }});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    req.session.orgId = null;
    res.send({});
  });

  return router;
};
