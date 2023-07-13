import React, { useEffect, useState } from "react";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";

// grab userId from props so it can be used in liking / unliking
const Post = ({
  userId,
  post,
  token,
  handleNewComment,
  comments,
  handleUpdatedCommentLikes,
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [authorImgSrc, setAuthorImgSrc] = useState(null);
  // use react's built-in state management for likes
  const [likes, setLikes] = useState(post.likes)

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const handlePostLike = async (e) => {
    e.preventDefault()
    
    console.log("handleLike is triggered");
    
    const response = await fetch(`/posts/${post._id}/like`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if(!likes.includes(userId)) {
      // if the post has not already been liked by the current user
      // add a like (their id)
      setLikes([...likes, userId])
    } else {
      // else if it has already been liked by the current user
      // remove a like (their id)
      // unfortunately JS doesn't have a neat way of removing things from arrays :)
      let index = likes.indexOf(userId)
      let likesCopy = [...likes]
      likesCopy.splice(index, 1)
      setLikes(likesCopy)
    }
  };

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

  useEffect(() => {
    if (post.authorId) {
      fetch(`/profiles/${post.authorId}/profileImage`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setAuthorImgSrc(objectURL);
        });
    }
  }, [post, token]);

  console.log(comments);
  return (
    <div>
      <div className="author-details">
        <div className="author">
          <img className="author-image" src={authorImgSrc} alt="Author" />
        </div>
        <div className="text-details">
          <div className="username">@{post.username}</div>
          <div className="time">{post.time}</div>
        </div>
      </div>
      <div className="message">{post.message}</div>
      <button onClick={handlePostLike}>
        <span role="img" aria-label="like">
          {"👍"}
        </span>
      </button>
      <div>{ likes.length } likes</div>

      <div
        className="post-container"
        data-cy="post"
        key={post._id}
        id={post._id}
      >
        {imgSrc && (
          <div className={`post-image-container ${isZoomed ? "zoomed" : ""}`}>
            <img
              className="post-image"
              src={imgSrc}
              alt="Post"
              onClick={handleZoom}
            />
            {isZoomed && (
              <div className="zoomed-image-container">
                <img className="zoomed-image" src={imgSrc} alt="Zoomed Post" />
                <button
                  className="zoomed-image-close-button"
                  onClick={() => setIsZoomed(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
        <CommentForm
          token={token}
          onNewComment={handleNewComment}
          postId={post._id}
        />

        <div id="comment-feed">
          {comments &&
            comments
              .filter((comment) => comment.postId === post._id)
              .map((comment) => (
                <div key={comment._id}>
                  <Comment
                    comment={comment}
                    onNewComment={handleNewComment}
                    token={token}
                    handleUpdatedCommentLikes={handleUpdatedCommentLikes}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
