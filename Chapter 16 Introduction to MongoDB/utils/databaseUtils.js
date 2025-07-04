const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:Govind@completecoding.pclg6rk.mongodb.net/?retryWrites=true&w=majority&appName=CompleteCoding";

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting to MongoDB : ", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found");
  } else {
    return _db;
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
