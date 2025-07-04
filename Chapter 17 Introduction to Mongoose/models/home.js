const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

// _id is automatically added by Mongoose
const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: String, required: true },
  photoURL: String,
  description: String,
});
/**
this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
    this.description = description;
    if (_id) {
      this._id = _id;
    }

save()
fetchAll()
findById(homeId)
deleteById(homeId)
 * 
 *
 */
