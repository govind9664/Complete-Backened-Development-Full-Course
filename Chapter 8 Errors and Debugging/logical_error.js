const logicalError = () => {
  let num = 5;
  if ((num = 10)) {
    console.log("num is : " + num);
  }

  let arr = [1, 2, 3, 4, 5];
  for (let i = 0; i <= arr.length; i++) {
    console.log(arr[i]);
  }
};

module.exports = logicalError;
