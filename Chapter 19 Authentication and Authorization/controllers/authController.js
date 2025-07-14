const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstname: "",
      lastname: "",
      email: "",
      userType: "",
      password: "",
    },
    user: {},
  });
};
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: [{ message: "Invalid email or password." }],
      oldInput: { email, password },
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user; // Store the user object in the session
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  req.session.destroy(() => {
    console.log("Session destroyed");
    res.redirect("/login");
  });
};

exports.postSignup = [
  check("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name must contain only alphabets"),

  check("lastname")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name must contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .trim()
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Please select a valid user type"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value, { req }) => {
      if (value != "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
  (req, res, next) => {
    const { firstname, lastname, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
        oldInput: {
          firstname,
          lastname,
          email,
          userType,
          password,
        },
        user: {},
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstname,
          lastname,
          email,
          userType,
          password: hashedPassword, // Password should be hashed before saving in production
        });
        return user.save();
      })
      .then((result) => {
        console.log("User saved successfully:", result);
        res.redirect("/login");
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [
            {
              message: err.message,
            },
          ],
          oldInput: {
            firstname,
            lastname,
            email,
            userType,
            password,
          },
          user: {},
        });
      });
  },
];
