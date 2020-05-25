const models = require("../models");

// Get profile data
function getUser(req, res) {
  const query = {
    where: {
      username: req.params.id,
    },
  };
  models.Users.findOne(query)
    .then((user) => {
      if (user != null) {
        user.password = "";
        res.jsend.success(user);
      } else res.jsend.error(user);
    })
    .catch((err) => res.jsend.error(err));
}

// Post user authentification
function userAuth(req, res) {
  const query = {
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  };
  // If user is found, dont return password with packet
  models.Users.findOne(query)
    .then((user) => {
      if (user != null) {
        user.password = "";
        res.jsend.success(user);
      } else res.jsend.error(user);
    })
    .catch((err) => res.jsend.error(err));
}

// Create new user
function addUser(req, res) {
  const queryCheck = {
    where: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
    },
  };
  const query = { ...req.body };

  models.Users.findOne(queryCheck)
    .then((exists) => {
      if (exists == null) {
        models.Users.create(query)
          .then(() => res.jsend.success("success"))
          .catch((err) => res.jsend.error(err));
      } else res.jsend.error(exists);
    })
    .catch((err) => res.jsend.error(err));
}

// Update user data
async function updateUser(req, res) {
  const queryCheck = {
    where: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
    },
  };

  const user = await Users.findOne(queryCheck);

  if (user != null) {
    user.role = req.body.role;
    user.password = req.body.password;
    user.country = req.body.country;
    user.city = req.body.city;
    user.address = req.body.address;
    user.houseNumber = req.body.houseNumber;
    user.zipCode = req.body.zipCode;
    user.image = req.body.image;

    user.save();
    res.jsend.success(user);
  } else res.jsend.error(user);
}

module.exports = {
  getUser,
  userAuth,
  addUser,
  updateUser,
};
