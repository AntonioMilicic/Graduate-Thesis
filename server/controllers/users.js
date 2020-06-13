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
        const data = user;
        user.password = "";
        res.jsend.success(user);
      } else res.jsend.error(user);
    })
    .catch((err) => res.jsend.error(err));
}
// Get user data from req product id
function getUserByProductId(req, res) {
  const id = req.params.id;

  models.Products.findByPk(id, { include: "user" })
    .then(data => data.user)
    .then(user => {
      const response = {
        username: user.username,
        country: user.country,
        city: user.city,
        zipCode: user.zipCode,
        image: user.image
      }
      res.jsend.success(response);
    }).catch(err => res.jsend.error(err));
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
      email: req.body.email,
      username: req.body.username,
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
      email: req.body.email,
      username: req.body.username,
    },
  };

  const user = await models.Users.findOne(queryCheck);

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
  getUserByProductId,
  userAuth,
  addUser,
  updateUser,
};
