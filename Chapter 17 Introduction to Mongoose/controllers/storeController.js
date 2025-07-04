const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "home-list",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings Store",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getToFavourite().then((favourite) => {
    favourite = favourite.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHomes) => {
      console.log(favourite, registeredHomes);
      const favouriteHome = registeredHomes.filter((home) =>
        favourite.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHome: favouriteHome,
        pageTitle: "My Favourite List",
        currentPage: "favourite-list",
      });
    });
  });
};

exports.addToFavouriteList = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) =>
      console.log("Favourite home added Successfully : ", result)
    )
    .catch((err) => console.log("Error while adding favourite home : ", err))
    .finally(() => res.redirect("/favourites"));
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
      });
    }
  });
};

exports.removeFromFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then((result) =>
      console.log("Favourite home removed Successfully : ", result)
    )
    .catch((err) => console.log("Error while removing favourite home : ", err))
    .finally(() => res.redirect("/favourites"));
};
