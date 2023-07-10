const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const defaultImagePath = path.join(
  __dirname,
  "../public/images/default.svg.png"
);

const defaultImage = {
  data: fs.readFileSync(defaultImagePath),
  contentType: "image/png", // Adjust the content type based on your default image format
};

const saltRounds = 10;  // Number of salt rounds for bcrypt hashing

const UsersController = {
  Create: (req, res) => {
    const { email, password, username } = req.body;

    // Generate a hash for the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        image: defaultImage,
      });
      user.save((err) => {
        if (err) {
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(201).json({ message: "OK" });
        }
      });
    });
  },
};

module.exports = UsersController;
