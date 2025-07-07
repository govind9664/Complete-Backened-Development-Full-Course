const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
  console.log("Session: ", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "home-list",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings Store",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourite) => {
      const favouriteHome = favourite.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        favouriteHome: favouriteHome,
        pageTitle: "My Favourite List",
        currentPage: "favourite-list",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.addToFavouriteList = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already added to favourite list");
      } else {
        fav = new Favourite({
          houseId: homeId,
        });
        fav
          .save()
          .then((result) =>
            console.log("Favourite home added Successfully : ", result)
          );
      }
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while adding favourite home : ", err);
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  //console.log("At home details page : ", homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-list",
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.removeFromFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) =>
      console.log("Favourite home removed Successfully : ", result)
    )
    .catch((err) => console.log("Error while removing favourite home : ", err))
    .finally(() => res.redirect("/favourites"));
};
