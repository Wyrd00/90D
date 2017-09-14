const { users } = require('../database/user_schema');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  console.log(req.body);
  let userData = req.body;
  if (!userData.email || !userData.password) {
    res.render('error', {
      message: 'Sorry, your user details is a little lacking. King hates you.', type: 'error'
    });
  }

  users.find({ email: userData.email }, (err, user) => {
    if (err) {
      // if an error was returned
      console.log(err);
    } else if (!user) {
      // Nothing matched
      res.render('error', {
        message: 'Yo go double check that email!', type: 'error'
      });
    } else {
      // this is okay
      console.log(user);
      let dbPassword = user[0].password;
      console.log(dbPassword);
      bcrypt.compare(userData.password, dbPassword, (err, response) => {
        if (err) {
          console.log(err);
        } else if (!response) {
          res.render('error', {
            message: 'Yo those password don\'t match!', type: 'error'
          });
        } else {
          res.redirect('/');
        }
      });
    }
  });
};
