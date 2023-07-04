import React, { useState } from "react";

const PostForm = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("Ok");
      }
    });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your post"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default PostForm;
