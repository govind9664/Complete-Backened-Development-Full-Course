// External Module
const fs = require("fs");

// core module
const path = require("path");

// Local module
const rooDir = require("../utils/pathUtils");

const favouriteDataPath = path.join(rooDir, "data", "favourites.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getToFavourite((favourite) => {
      if (favourite.includes(homeId)) {
        callback("Home is already marked in favourite");
      } else {
        favourite.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourite), callback);
      }
    });
  }

  static getToFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getToFavourite((homeIds) => {
      const filterIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(filterIds), callback);
    });
  }
};
