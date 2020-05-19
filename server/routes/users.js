const User = require("../models/Users");

// Get profile data
function getUser(req, res, next) {
  const query = {
    where: {
      username: req.params.id,
    },
  };
  User.findOne(query)
    .then((Users) => {
      res.jsend.success(Users);
    })
    .catch((err) => res.jsend.error(err));
}

function userAuth(req, res, next) {
  const query = {
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  };
  User.findOne(query)
    .then((login) => {
      res.jsend.success(login);
    })
    .catch((err) => res.jsend.error(err));
}

// Add user
// function addUser(req, res, next) {
//   const data = {
//     first_name: "Toni",
//     last_name: "Milicic",
//     username: "Laseen",
//     role: "Admin",
//     email: "toni@mail.com",
//     password: "password",
//     country: "Croatia",
//     city: "Trogir",
//     address: "Betanija",
//     house_number: "15",
//     zip_code: "21220",
//     image: "../assets/images/user-toni.jpg",
//   };
//   let {
//     first_name,
//     last_name,
//     username,
//     role,
//     email,
//     password,
//     country,
//     city,
//     adress,
//     house_number,
//     zip_code,
//     image,
//   } = data;
//   // Insert into table

//   Users.create({
//     first_name,
//     last_name,
//     username,
//     role,
//     email,
//     password,
//     country,
//     city,
//     adress,
//     house_number,
//     zip_code,
//     image,
//   })
//     .then((user) => res.redirect("/"))
//     .catch((err) => console.log(err));
// }

module.exports = { getUser, userAuth };
