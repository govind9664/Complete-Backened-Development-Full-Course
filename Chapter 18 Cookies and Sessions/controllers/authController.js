exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  console.log("Login successful for:", req.body);
  //res.cookie("isLoggedIn", true);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    console.log("Session destroyed");
    res.redirect("/login");
  });
};
