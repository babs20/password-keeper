/*
 * All routes for Registration are defined here
 * Since this file is loaded in server.js into registration,
 *   these routes are mounted onto /registration
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  // user route - send user obj
  router.post('/user', (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 12)
      .then(password => {
        user.password = password;
      })
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
    const user = req.body;
    database.addUser(user)
      .then((user) => {
        res.send(JSON.stringify(user));
      });
  })

  return router;
};
