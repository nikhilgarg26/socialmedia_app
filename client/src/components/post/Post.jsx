import React, { useContext, useEffect, useState } from 'react'
import './Post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Post({ post }) {
    // console.log(post);
    const { user } = useContext(Context);
    const [postuser, setuser] = useState({});
    const [liked, setlike] = useState(false);

    const PF = "http://localhost:5000/images/";

    const handleLike = async () => {
        if (liked) {
            const likes = post.likes;
            likes.splice(likes.indexOf(user._id), 1);
            await axios.put("http://localhost:5000/api/posts/" + post._id,
                { type: "unlike" }, { withCredentials: true })
            setlike(false);

        } else {
            // console.log(user._id);
            const likes = post.likes;
            likes.push(user._id);

            await axios.put("http://localhost:5000/api/posts/" + post._id,
                { type: "like" }, { withCredentials: true })
            setlike(true);
            // console.log(res);
        }
    }


    useEffect(() => {
        const fetchuser = async () => {
            const res = await axios.get("http://localhost:5000/api/auth/" + post.userId);
            // console.log(res);
            setuser(res.data);
        };
        fetchuser();
    }, [post.userId]);

    useEffect(() => {
        // console.log(post.likes);
        if (post.likes.includes(user._id)) {
            setlike(true);
        }
        // console.log(liked);
    }, [])
    // console.log(post);
    return (
        <div className='displayposts'>
            <div className='topost'>
                <div className='text'>
                    <Link to={`/profile/${postuser._id}`}>
                        {/* <img src="/assets/design.png" alt="" /> */}
                        {postuser.profilePicture ? <img src={PF + postuser.profilePicture} alt="kjn" /> : <img src={PF + "defaultimg.png"} alt="nm" />}
                    </Link>
                    <Link to={`/profile/${postuser._id}`}>
                        <div className='detail'>
                            <span className='name'>{postuser.firstname + " " + postuser.lastname} </span>
                            <span className='time'>{new Date(post.createdAt).toDateString()}</span>
                        </div>
                    </Link>
                </div>
                <div className='desc'>
                    <span>{post.desc}</span>
                </div>
                <div className='file'>
                    {/* <img src="/assets/design.png" alt="" /> */}
                    {post.img && <img src={PF + post.img} alt="kjn" />}
                </div>
                <div className='react'>
                    <div className='number'>
                        <div className='like'>
                            <FavoriteBorderIcon />
                            <span>{post.likes.length}</span>
                        </div>
                        <div className='like'>
                            <span style={{ marginRight: "10px" }}>{post.comments.length} </span>
                            <span> Comments</span>
                        </div>
                    </div>
                    <div className='post'>

                        <button className='photos' type="submit" style={{ marginRight: "10px" }} onClick={handleLike}>{liked ? "Unlike" : "Like"}</button>
                        <button className='photos' type="submit">Comment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
