import React from "react";

const SearchResults = ({ users, posts }) => {
  return (
    <div className="search-results">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;


