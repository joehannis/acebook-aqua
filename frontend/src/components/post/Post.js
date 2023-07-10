import React, { useEffect, useState } from "react";

const Post = ({ post, token }) => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (post._id && post.image && post.image.data) {
      // Check if the post has image data
      fetch(`/posts/image/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setImgSrc(objectURL);
        });
    }
  }, [post, token]);

  return (
    <div className="post-container" data-cy="post" key={post._id} id={post._id}>
      <div className="username">{post.username}</div>
      <div className="time">{post.time}</div>
      <div className="message">{post.message}</div>
      {imgSrc && <img className="post-image" src={imgSrc} alt="Post Image" />}
      <div className="comments">{post.comments}</div>
      {/* <input type="text"></input> */}
    </div>
  );
};

export default Post;
