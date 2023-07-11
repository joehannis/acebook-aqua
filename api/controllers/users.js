const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const defaultImagePath = path.join(
  __dirname,
  "../public/images/default.svg.png"
);

const defaultImage = {
  data: fs.readFileSync(defaultImagePath),
  contentType: "image/png", // Adjust the content type based on your default image format
};
const JWT = require("jsonwebtoken");

const UsersController = {
  Create: (req, res) => {
    // Create a new user with default image
    const user = new User({
      email: req.body.email,
      password: req.body.password,
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
  },

  getUserByUsername: (req, res) => {
    const token = req.params.token; // Assuming the route parameter is named "token"

    // Verify the token to retrieve the user ID
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = payload.user_id;

        // Find the user by the retrieved user ID
        User.findById(userId, (err, user) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
          } else if (!user) {
            res.status(404).json({ message: "User not found" });
          } else {
            res.status(200).json({ username: user.username });
          }
        });
      }
    });
  },
};

module.exports = UsersController;
