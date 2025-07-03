const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
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
  Favourite.getToFavourite((favourite) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHome = registeredHomes.filter((home) =>
        favourite.includes(home.id)
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
  console.log("Came to add to Favourite", req.body.id);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  //console.log("At home details page : ", homeId);
  Home.findById(homeId, (home) => {
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
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from favourite ", error);
    }
    res.redirect("/favourites");
  });
};
