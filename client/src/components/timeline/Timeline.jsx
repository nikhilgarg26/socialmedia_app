import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Timeline.css'
import Post from '../post/Post';
import Share from '../share/Share';

export default function Timeline() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts", {withCredentials: true});
            // console.log(res);
            setPosts(res.data);
        };
        fetchPosts();

    }, [])

    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
    return (
        <div className='time'>
            <Share />
            {posts.map((p) => (
                <Post post={p} />
            ))}
        </div>
    )
}
