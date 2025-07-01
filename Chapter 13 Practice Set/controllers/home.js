const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Registration successful for:", req.body);
  // Destructuring object data
  const { houseName, price, location, rating, photoURL } = req.body;
  const home = new Home(houseName, price, location, rating, photoURL);
  home.save();

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    console.log(registeredHomes);
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "home",
    });
  });
};
