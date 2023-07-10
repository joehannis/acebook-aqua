import React, { useState, useEffect } from "react";
import ProfileImageForm from "./ProfileImageForm";
import ProfileInfoForm from "./ProfileInfoForm";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    fetch(`/profiles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setName(data.name);
        setBio(data.bio);

        if (data.image) {
          fetch(`/profiles/${id}/profileImage`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((response) => response.blob())
            .then((blob) => {
              const objectURL = URL.createObjectURL(blob);
              setProfileImageSrc(objectURL);
            })
            .catch((error) => {
              console.error("Error fetching profile image:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const handleProfileDataChange = () => {
    fetchProfileData();
  };

  const handleProfileImageChange = () => {
    fetchProfileData();
  };

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  const { username, followers } = profileData;

  return (
    <div className="container">
      <header className="header">
        <h1>My Profile</h1>
      </header>

      <div className="banner">
        <div className="profile-picture-container">
          <div className="profile-photo">
            <img
              src={profileImageSrc}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <ProfileImageForm
            token={localStorage.getItem("token")}
            onProfileImageChange={handleProfileImageChange}
            userId={id}
          />
        </div>
      </div>

      <div className="user-info-container">
        <h2 className="name">{name}</h2>
        <p className="username">@{username}</p>
        <p className="followers">{followers} Followers</p>
        <p className="bio">{bio}</p>
        <ProfileInfoForm
          token={localStorage.getItem("token")}
          onProfileDataChange={handleProfileDataChange}
          currentData={profileData}
          userId={id}
        />
      </div>

      <div className="my-posts-container">
        <h2>My Posts</h2>
        <div className="my-posts">{/* Placeholder for posts */}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
