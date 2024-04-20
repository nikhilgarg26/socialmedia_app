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
  // console.log(path);
  // if(path)path="?userId="+path;
  // console.log(params);
  const [posts, setPosts] = useState([]);
  const [userprofile, setuser] = useState([]);
  const [profilefile, setprofileFile] = useState(null);
  const [coverfile, setcoverFile] = useState(null);
  const [friendship, setfriends] = useState(false);
  const [waiting,setwaiting]=useState(false);
  // const [profilefile, setprofileFile] = useState(null);


  const PF = "http://localhost:5000/images/"

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/?userId=" + path);
      const res2 = await axios.get("http://localhost:5000/api/auth/" + path);
      // console.log(res);
      setPosts(res.data);
      setuser(res2.data);
    };
    fetchPosts();
  }, [path]);
  console.log(posts);

  // const allfriends=user.friends;
  // const t=allfriends.includes(userprofile._id);

  useEffect(() => {
    // console.log(post.likes);
    if (user.friends.includes(path)) {
      setfriends(true);
    }
    else if(user.sentreq.includes(path)){
      setwaiting(true);
    }
    // console.log(liked);
  }, [])
// console.log(friendship);

  // console.log(user);
  // console.log(file);
  // console.log(coverfile);
  const handleProfile = async () => {

    if (profilefile) {
      try {
        const data = new FormData();
        const filename = Date.now() + profilefile.name;
        // console.log(filename);
        data.append("name", filename);
        data.append("file", profilefile);
        // console.log(data);
        const profilePicture = filename;
        try {
          await axios.post("http://localhost:5000/api/upload", data);
          const res = await axios.put(("http://localhost:5000/api/auth/" + user._id), { profilePicture });
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
        const filename = Date.now() + coverfile.name;
        // console.log(filename);
        data.append("name", filename);
        data.append("file", coverfile);
        // console.log(data);
        const coverPicture = filename;
        try {
          await axios.post("http://localhost:5000/api/upload", data);
          const res = await axios.put(("http://localhost:5000/api/auth/" + user._id), { coverPicture });
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
          // console.log(res);
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
    if (friendship) {
      const friends = user.friends;
      friends.splice(friends.indexOf(userprofile._id), 1);
      const res = await axios.put("http://localhost:5000/api/auth/" + user._id,
        { friends }
      )
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      {
        const friends = userprofile.friends;
        friends.splice(friends.indexOf(user._id), 1);
        await axios.put(("http://localhost:5000/api/auth/" + userprofile._id), { friends });
        setfriends(false);
      }
    } else if(!friendship && !waiting) {
      // const friend1 = user.friends;
      // friend1.push(userprofile._id);
      // const res = await axios.put("http://localhost:5000/api/auth/" + user._id,
      //   { friend1 }
      // )
      // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      const friendreq = userprofile.friendreq;
      const sentreq=user.sentreq;
      sentreq.push(userprofile._id);
      friendreq.push(user._id);
      const res=await axios.put(("http://localhost:5000/api/auth/" + user._id), { sentreq });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      await axios.put(("http://localhost:5000/api/auth/" + userprofile._id), { friendreq });
      setwaiting(true);
      // setfriends(1);
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
            {(user._id !== userprofile._id) && <button className='friends' onClick={handleFriendship}>{(friendship === true) ?  "Unfriend" : ((friendship === false && waiting===true)? "Pending Req" : "Send Request")}</button>}

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
