const Home = require("../models/home");
const fs = require("fs");
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "add-home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing;

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      editing: editing,
      currentPage: "add-home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    //console.log(registeredHomes);
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-home-list",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  //console.log("Home Registration successful for:", req.body);
  // Destructuring object data
  console.log("From postAddHome function: ", req.body);
  const { houseName, price, location, rating, description } = req.body;
  console.log(req.file);

  if (!req.file) {
    return res.status(400).send("No file uploaded. Please upload a photo.");
  }

  const photo = req.file.path;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  home.save().then(() => {
    console.log("Home added successfully");
  });

  res.redirect("/host/host-home-list");
  // res.render("host/home-added", {
  //   pageTitle: "Home Added Successfully",
  //   currentPage: "home-added",
  // });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;

  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log(err);
          }
        });
        const photo = req.file.path;
        home.photo = photo;
      }
      home.description = description;

      home
        .save()
        .then((result) => {
          console.log("Home Updated Successfully : ", result);
        })
        .catch((err) => console.log("Error while updating home : ", err));
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while finding home: ", error);
    });
};

exports.postDeleteHome = (req, res, next) => {
  //console.log("Home Registration successful for:", req.body);
  // Destructuring object data
  const homeId = req.params.homeId;
  console.log("Came to delete : ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting home: ", error);
    });
};
