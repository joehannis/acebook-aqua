const User = require("../models/users");
const Post = require("../models/posts");

const search = async (req, res) => {
  const { query } = req.query;
  
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    });

    const posts = await Post.find({ message: { $regex: query, $options: "i" } });

    res.json({ users, posts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { search };
