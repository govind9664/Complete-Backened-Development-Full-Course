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

  Home.findById(homeId).then((home) => {
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
  Home.find().then((registeredHomes) => {
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
  console.log("From postAddHome function: ", req.body);
  const { houseName, price, location, rating, photoURL, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoURL,
    description,
  });
  home.save().then(() => {
    console.log("Home added successfully");
  });

  res.redirect("/host-home-list");
  // res.render("host/home-added", {
  //   pageTitle: "Home Added Successfully",
  //   currentPage: "home-added",
  // });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoURL, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoURL = photoURL;
      home.description = description;

      home
        .save()
        .then((result) => {
          console.log("Home Updated Successfully : ", result);
        })
        .catch((err) => console.log("Error while updating home : ", err));
      res.redirect("/host-home-list");
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
      res.redirect("/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting home: ", error);
    });
};
