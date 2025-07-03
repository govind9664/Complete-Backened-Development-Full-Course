const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing;

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      editing: editing,
      currentPage: "add-home",
    });
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    //console.log(registeredHomes);
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-home-list",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  //console.log("Home Registration successful for:", req.body);
  // Destructuring object data
  const { houseName, price, location, rating, photoURL } = req.body;
  const home = new Home(houseName, price, location, rating, photoURL);
  home.save();

  res.redirect("/host-home-list");
  // res.render("host/home-added", {
  //   pageTitle: "Home Added Successfully",
  //   currentPage: "home-added",
  // });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoURL } = req.body;
  const home = new Home(houseName, price, location, rating, photoURL);
  home.id = id;
  home.save();

  res.redirect("/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  //console.log("Home Registration successful for:", req.body);
  // Destructuring object data
  const homeId = req.params.homeId;
  console.log("Came to delete : ", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while deleting home: ", error);
    }
    res.redirect("/host-home-list");
  });
};
