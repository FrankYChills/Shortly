const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// use User Collection
const User = require("../models/User");

/**
 * ROUTE - "/api/auth/register"
 * METHOD - POST
 * This method handles the requests for new user registration.
 */
router.post("/register", async (req, res) => {
  // check for all fields
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  if (
    typeof req.body.username != "string" ||
    typeof req.body.password != "string"
  ) {
    return res
      .status(400)
      .json({ message: "username or password must be of type string" });
  }
  // check if user already exists
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) {
    return res
      .status(400)
      .json({ message: "User with the username already exists!" });
  }

  // create a new user

  // hash the password before it gets saved to the DB
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = { username: req.body.username, password: hashedPassword };

  try {
    const user = await User.create(newUser);
    res.status(201).json({ message: "User created succesfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

/**
 * ROUTE - "/api/auth/login"
 * METHOD - POST
 * This method handles the request for user logins and sends an JWT token to the logged in user for authorization.
 */
router.post("/login", async (req, res) => {
  // check for all fields
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  if (
    typeof req.body.username != "string" ||
    typeof req.body.password != "string"
  ) {
    return res
      .status(400)
      .json({ message: "username or password must be of type string" });
  }
  try {
    // check if user doesn't exists
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      return res.status(400).json({ message: "User doesn't exists!" });
    }

    // check for valid password
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) {
      return res.json({ message: "Invalid Password!" });
    }

    // generate access token for authorization
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // slice password out
    const { password, ...otherInfo } = user._doc;

    // send response back
    res
      .status(200)
      .json({ message: "Login Success", data: { ...otherInfo, accessToken } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
