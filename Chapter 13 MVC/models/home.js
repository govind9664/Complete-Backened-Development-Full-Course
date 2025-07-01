// External Module
const fs = require("fs");

// core module
const path = require("path");

// Local module
const rooDir = require("../utils/pathUtils");
const { error } = require("console");

let registeredHomes = [];

module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }

  save() {
    registeredHomes.push(this);
    const homeDataPath = path.join(rooDir, "data", "homes.json");
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
      console.log("File Writing Concluded", error);
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rooDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      console.log("File read : ", err, data);

      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
};
