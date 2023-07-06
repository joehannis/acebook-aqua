const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/:post_id/like", PostsController.AddLike);
// router.put("/:post_id/dis-like", PostsController.AddLike);

module.exports = router;
