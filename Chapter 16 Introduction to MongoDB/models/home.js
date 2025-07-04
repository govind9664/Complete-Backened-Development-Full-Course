const db = require("../utils/databaseUtils");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL, id, description) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
    this.id = id;
    this.description = description;
  }

  save() {
    console.log("From save function : ", {
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      photoURL: this.photoURL,
      description: this.description,
    });

    // Below syntax is deprecated because of security issues like sql injection using this syntax like ')); DELETE TABLE homes;

    // return db.execute(
    //   'INSERT INTO homes (houseName,price,location,rating,photoURL,description) VALUES ("${this.houseName}",${this.price},"${this.location}",${this.rating},"${this.photoURL}","${this.description}")'
    // );

    // This is the right way to write sql query
    if (this.id) {
      return db.execute(
        "UPDATE homes SET houseName = ?,price = ?,location =?,rating =?,photoURL =?,description =? WHERE id = ?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoURL,
          this.description,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (houseName,price,location,rating,photoURL,description) VALUES (?,?,?,?,?,?)",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoURL,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
