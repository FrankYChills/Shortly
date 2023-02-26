const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// use User DB
const User = require("../models/User");

router.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  const user = await User.findOne({ username: req.body.username }).exec();
  if (user) {
    return res
      .status(400)
      .json({ message: "User with the username already exists!" });
  }

  //create a new user
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

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "All Fields are required!" });
  }
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      return res.status(400).json({ message: "User doesn't exists!" });
    }

    //   check for valid password
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) {
      return res.json({ message: "Invalid Password!" });
    }
    //   generate access token for authorization
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

    res
      .status(200)
      .json({ message: "Login Success", data: { ...otherInfo, accessToken } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
