const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const time = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero-based, so add 1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
};

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const current_time = time();
    const post = new Post(req.user_id, current_time, req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
