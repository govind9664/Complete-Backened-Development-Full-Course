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

// homeSchema.pre("findOneAndDelete", async function (next) {
//   console.log("Came to pre hook while deleting a home");
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({ houseId: homeId });
//   next();
// });

module.exports = mongoose.model("Home", homeSchema);
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
find()
findById(homeId)
deleteById(homeId)
 * 
 *
 */
