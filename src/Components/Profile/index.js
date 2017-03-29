import React from 'react'
import './style.css'
const Profile = (props) => {
  const {
    id,
    name,
    profile_image_url,
    followers_count,
    friends_count,
    listed_count,
    time_zone
  } = props.userData
  return (
    <div className="card" data-id={id}>
      <div className="userInfo">
        <img src={profile_image_url} alt="Avatar"/>
        <div className="container">
          <h4><b>{name}</b></h4>
          <p># Followers: {followers_count}</p>
          <p># Friends: {friends_count}</p>
          <p># Listed: {listed_count}</p>
          <p>Time Zone: {time_zone}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
