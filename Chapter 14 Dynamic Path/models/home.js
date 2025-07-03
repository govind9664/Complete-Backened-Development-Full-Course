// External Module
const fs = require("fs");

// core module
const path = require("path");

// Local module
const rooDir = require("../utils/pathUtils");
const { error } = require("console");

let registeredHomes = [];
const homeDataPath = path.join(rooDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        // edit home case
        registeredHomes = registeredHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      //console.log("File read : ", err, data);

      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static findById(id, callback) {
    Home.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === id);
      callback(homeFound);
    });
  }

  static deleteById(id, callback) {
    Home.fetchAll((homes) => {
      const afterDelHome = homes.filter((home) => home.id !== id);
      fs.writeFile(homeDataPath, JSON.stringify(afterDelHome), callback);
    });
  }
};
