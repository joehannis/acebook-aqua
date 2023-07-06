import React, { useState } from "react";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0); // Initialize likes with the existing value or 0

  const handleLike = () => {
    // Update the likes count
    setLikes(likes + 1);
  };

  return (
    <div className="post-container" data-cy="post" key={post._id}>
      <div className="username">{post.username}</div>
      <div className="time">{post.time}</div>
      <div className="message">{post.message}</div>
      <div className="likes">Likes: {likes}</div> {/* Display the likes count */}
      <button onClick={handleLike}>
  {/* Use an emoji, such as a thumbs-up */}
  <span role="img" aria-label="like">
    👍
  </span>
</button>
<button onClick={handleLike}>
  {/* Use an emoji, such as a thumbs-up */}
  <span role="img" aria-label="dis-like">
    👎
  </span>
</button>
 {/* Add a like button */}
      <form className="post-form">
        <input type="submit" value="Comment"></input>
        <input type="text" id="name" name="name" required></input>
      </form>
    </div>
  );
};

export default Post;

