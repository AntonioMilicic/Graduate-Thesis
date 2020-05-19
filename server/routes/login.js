const Login = require("../models/Login");

// Post for login, if no user, returns null

function userAuth(req, res, next) {
  const query = {
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  };
  Login.findOne(query)
    .then((login) => {
      res.jsend.success(login);
    })
    .catch((err) => res.jsend.error(err));
}

module.exports = { userAuth };
