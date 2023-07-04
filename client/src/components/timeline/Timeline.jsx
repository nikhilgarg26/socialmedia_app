import React, { useEffect, useState } from 'react'
import './Timeline.css'
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';


export default function Timeline() {
    const [posts,setPosts] = useState([]);

    // const [allusers,setallusers]=useState([]);

    // useEffect(()=>{
    //     const fetchusers=async()=>{
    //         const res=await axios.get("http://localhost:5000/api/auth")
    //         setallusers(res.data);
    //     }
    //     fetchusers();
    //     // console.log(allusers);
    // },[])

    // localStorage.setItem("alluser", JSON.stringify(allusers))
    


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts");
            // console.log(res);
            setPosts(res.data);
        };
        fetchPosts();
        
    },[])
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // console.log(posts);
    // const t=posts[0];
    // console.log(new Date(t.createdAt).toDateString());
    
    // console.log(posts);
    return (
        <div className='time'>
            <Share />
            {posts.map((p)=>(
                <Post post={p}/>
            ))}
        </div>
    )
}
