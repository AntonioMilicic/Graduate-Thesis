const Products = require("../models/Products");

// Get product list
function get(req, res, next) {
  Products.findAll()
    .then((products) => {
      res.jsend.success(products);
    })
    .catch((err) => res.jsend.error(err));
}

// // Add product
// router.get("/add", (req, res) => {
//   const data = {
//     owner: "Ana",
//     title: "Treči Proizvod",
//     price: 200,
//     quantity: 15,
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     category: "cars",
//     image_sources: [
//       "../assets/images/dog4.jpg",
//       "../assets/images/dog5.jpg",
//       "../assets/images/dog6.jpg",
//     ],
//   };
//   let {
//     owner,
//     title,
//     price,
//     quantity,
//     description,
//     category,
//     image_sources,
//   } = data;
//   // Insert into table

//   Products.create({
//     owner,
//     title,
//     price,
//     quantity,
//     description,
//     category,
//     image_sources,
//   })
//     .then((products) => res.redirect("/Products"))
//     .catch((err) => console.log(err));
// });

module.exports = { get };
