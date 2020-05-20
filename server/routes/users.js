const { Users, UsersNeededData } = require("../models/Users");

// Get profile data
function getUser(req, res) {
  const query = {
    where: {
      username: req.params.id,
    },
  };
  UsersNeededData.findOne(query)
    .then((user) => {
      res.jsend.success(user);
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
  Users.findOne(query)
    .then((user) => {
      if (user != null) {
        user.password = null;
        res.jsend.success(user);
      } else res.jsend.error(user);
    })
    .catch((err) => res.jsend.error(err));
}

// Create new user
function addUser(req, res) {
  const queryCheck = {
    where: {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
    },
  };
  const query = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username: req.body.username,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    house_number: req.body.houseNumber,
    zip_code: req.body.zipCode,
    image: req.body.image,
  };

  Users.findOne(queryCheck)
    .then((created) => {
      if (created == null) {
        Users.create(query)
          .then(() => res.jsend.success("success"))
          .catch((err) => res.jsend.error(err));
      } else res.jsend.error(created);
    })
    .catch((err) => res.jsend.error(err));
}

module.exports = { getUser, userAuth, addUser };
