import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import LogoutForm from "../auth/LogoutForm";
import SignUpForm from "../user/SignUpForm";
import Feed from "../feed/Feed";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import NotificationModal from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import Profile from "../profile/ProfilePage";
import FeedButton from "../feed/FeedButton";
import jwt_decode from "jwt-decode";
import SearchResults from "../searchbar/SearchResults";
 // Add this line

import "./App.css";

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showLogoutForm, setShowLogoutForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => setShowLoginForm(true); // Renamed to handleLogin
  const handleSignup = () => setShowSignUpForm(true); // Renamed to handleSignup
  const handleNotifications = () => setShowNotificationModal(true);
  const handleLogout = () => setShowLogoutForm(true);

  const handleSuccessfulLogin = () => {
    setIsUserLoggedIn(true);
    // ...other stuff, like closing the modal
  };

  const handleSearch = (query) => {
    setIsSearching(true);

    fetch(`/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSearching(false);
      });
  };

    useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined") {
      setIsUserLoggedIn(true);
      const userIdFromStorage = window.localStorage.getItem("userId");
      if (
        userIdFromStorage &&
        userIdFromStorage !== "null" &&
        userIdFromStorage !== "undefined"
      ) {
        setUserId(userIdFromStorage); // Restore userId from localStorage
      }
    }
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <Link className="header-link" to="/">
          <h1 className="header-title">ACEBOOK</h1>
        </Link>
      </div>

      <div className="main-content">
        <Navbar
          onLogin={handleLogin}
          onSignup={handleSignup}
          onNotifications={handleNotifications}
          onLogout={handleLogout}
        />

        <div className="content">
          <div className="top-bar">
            <div className="top-right">
              <FeedButton />
              <ProfileButton userId={userId} />
            </div>
          </div>

          <div className="feed-container">
            <SearchBar onSearch={handleSearch} />
            {isSearching ? (
            <div>Loading search results...</div>
            ) : (
            <SearchResults users={searchResults.users} posts={searchResults.posts} />
            )}
              <Routes>
                <Route
                  path="/"
                  element={
                    isUserLoggedIn ? (
                      <Feed navigate={navigate} />
                    ) : (
                      <div>Please log in to see the feed.</div>
                    )
                  }
                />
                <Route
                  path="/profiles/:id"
                  element={
                    isUserLoggedIn ? (
                      <Profile userId={userId} />
                    ) : (
                      <div>Please log in to see the profile.</div>
                    )
                  }
                />
              </Routes>
            {!isSearching && (
              <div className="search-results">
                <h2>Search Results</h2>
                <SearchResults
                  users={searchResults.users}
                  posts={searchResults.posts}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showLoginForm && (
        <LoginForm
          navigate={navigate}
          onClose={() => setShowLoginForm(false)}
          handleSuccessfulLogin={handleSuccessfulLogin} // <-- pass this method to the LoginForm component
        />
      )}

      {showLogoutForm && (
        <LogoutForm
          navigate={navigate}
          onClose={() => setShowLogoutForm(false)}
          setIsUserLoggedIn={setIsUserLoggedIn}
        />
      )}

      {showSignUpForm && (
        <SignUpForm
          navigate={navigate}
          onClose={() => setShowSignUpForm(false)}
        />
      )}

      {showNotificationModal && (
        <NotificationModal
          navigate={navigate}
          onClose={() => setShowNotificationModal(false)}
        />
      )}
    </div>
  );
};

export default App;
