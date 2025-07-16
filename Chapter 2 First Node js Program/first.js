console.log("Welcome to the Complete Backened Course");

const fs = require("fs");

fs.writeFile("output.txt", "Prashant Sir is the Best Teacher", (err) => {
  if (err) {
    console.log("Error Occured");
  } else {
    console.log("File written Succssfully");
  }
});
