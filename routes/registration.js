/*
 * All routes for Registration are defined here
 * Since this file is loaded in server.js into registration,
 *   these routes are mounted onto /registration
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  // user route
  router.post('/organization', (req, res) => {
    const user = req.body;
    database.addUser(user)
      .then((user) => {
        res.send(JSON.stringify(user));
      });
  })

  // organization route

  return router;
};
