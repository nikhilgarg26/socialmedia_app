import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import Share from '../../components/share/Share'
import Post from '../../components/post/Post'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'

export default function Profile() {
  const { user, dispatch } = useContext(Context);

  const params = useParams();
  const path = params.userId;

  const [posts, setPosts] = useState([]);
  const [userprofile, setuser] = useState([]);

  const [friendship, setfriends] = useState("");
  // const [waiting,setwaiting]=useState("false");

  const PF = "http://localhost:5000/images/"

  const [profilefile, setprofileFile] = useState(null);
  const [coverfile, setcoverFile] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/?userId=" + path, { withCredentials: true });
      const res2 = await axios.get("http://localhost:5000/api/auth/" + path, { withCredentials: true });

      setPosts(res.data);
      setuser(res2.data);
    };
    fetchPosts();
  }, [path]);

  useEffect(() => {
    if (user.friends.includes(path)) {
      setfriends("Friends");
    }
    else if (user.sentreq.includes(path)) {
      setfriends("Requested");
    }
    else if (user.friendreq.includes(path)) {
      setfriends("Accept ?");
    }
    else {
      setfriends("Send Request");
    }


  }, [path, user])

  const handleProfile = async () => {

    if (profilefile) {
      try {
        const data = new FormData();
        
        data.append("file", profilefile);
        data.append("profile", "profilePic")
       
        try {
          const res = await axios.post("http://localhost:5000/api/upload", data, {withCredentials: true});
          console.log(res)
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          console.log(err);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  const handleCover = async () => {

    if (coverfile) {
      try {
        const data = new FormData();
        
        data.append("file", coverfile);

        try {
          const res = await axios.post("http://localhost:5000/api/upload", data, {withCredentials: true});
          console.log(res);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

        } catch (err) {
          console.log(err);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  const handleFriendship = async () => {
    if (friendship === "Friends") {
    
      user.friendreq.splice(user.friendreq.indexOf(path), 1);

      const res = await axios.post("http://localhost:5000/api/friend/unfriend",
        {
          friendid: path
        }, { withCredentials: true }
      )
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setfriends("Send Request");
    }
    else if (friendship === "Accept ?") {
      
      user.friends.push(path);

      user.friendreq.splice(user.friendreq.indexOf(path), 1);

      const res = await axios.post("http://localhost:5000/api/friend/accept",
        {
          friendreqid: path
        }, { withCredentials: true }
      )
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setfriends("Friends");
    }
    else if(friendship === "Send Request") {
      
      user.sentreq.push(path);

      const res= await axios.post("http://localhost:5000/api/friend/sendreq",
        {
          friendreqid: path
        }, { withCredentials: true }
      )
      console.log(res)
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setfriends("Requested");
    }
  }

  const friendsno = 0;
  // console.log(friends)

  return (
    <div className="profile">
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            {/* <img
              className="profileCoverImg"
              src="/assets/design.png"
              alt=""
            /> */}

            <div>
              {userprofile.coverPicture ?
                <img src={coverfile ? URL.createObjectURL(coverfile) : PF + userprofile.coverPicture} alt="kjn" className="profileCoverImg" /> :
                <img src={coverfile ? URL.createObjectURL(coverfile) : PF + "defaultimg.png"} alt="nm" className="profileCoverImg" />
              }
              {(user._id === userprofile._id) && (<>
                <label htmlFor="fileInputcover">
                  {/* <AddPhotoAlternateIcon  /> */}
                  <span style={{ margin: "10px" }}>Add cover</span>
                </label>
                <input
                  type="file"
                  id="fileInputcover"
                  style={{ display: "none" }}
                  onChange={e => setcoverFile(e.target.files[0])}
                />
                <button onClick={handleCover}>Change</button></>)}
            </div>


            <div>
              {userprofile.profilePicture ?
                <img src={profilefile ? URL.createObjectURL(profilefile) : PF + userprofile.profilePicture} alt="kjn" className="profileUserImg" /> :
                <img src={profilefile ? URL.createObjectURL(profilefile) : PF + "defaultimg.png"} alt="nm" className="profileUserImg" />
              }
              {(user._id === userprofile._id) && (<>
                <label htmlFor="fileInput">
                  {/* <AddPhotoAlternateIcon style={{ margin: "10px" }} /> */}
                  <span style={{ margin: "10px" }}>Add profile</span>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={e => setprofileFile(e.target.files[0])}
                />
                <button onClick={handleProfile}>Change</button>
              </>)}
            </div>
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{userprofile.firstname + " " + userprofile.lastname}</h4>
            <span className="profileInfoDesc">{userprofile.desc}</span>
            {(user._id !== userprofile._id) && <button className='friends' onClick={handleFriendship}>{friendship}</button>}

          </div>
        </div>
        <div className="profileRightBottom">
          <div className="feed" style={{ marginRight: "10px" }}>
            {(user._id === userprofile._id) && <Share />}

            <ul className='settings'>
              <li><button>Your Photos</button></li>
              <li><button>Friends <span>{friendsno}</span></button></li>
              <li><button>About</button></li>
            </ul>
          </div>
          <div className="feed">{posts.map((p) => (
            <Post post={p} />
          ))}</div>
          {/* <Rightbar user={user} /> */}
        </div>
      </div>
    </div>
  )
}
