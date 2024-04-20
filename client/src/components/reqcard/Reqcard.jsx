import React, { useContext, useState } from 'react'
import './Reqcard.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { Context } from '../../context/Context';

export default function Reqcard({ request }) {

    // console.log(friend);
    const [acc, setacc] = useState(false);
    // const [dlt,setdlt]=useState(f);
    const { user, dispatch } = useContext(Context);
    const [frienduser, setuser] = useState({});
    const PF = "http://localhost:5000/images/";
    useEffect(() => {
        const fetchuser = async () => {
            const res = await axios.get("http://localhost:5000/api/auth/" + request);
            // console.log(res);
            setuser(res.data);
        };
        fetchuser();
    }, [request]);

    // console.log(user.friends);
    const handleAcc = async () => {
        const friends = user.friends;
        // console.log(friend);
        friends.push(request);
        const friendreq = user.friendreq;
        friendreq.splice(friendreq.indexOf(request), 1);
        // console.log(user.friendreq);
        // console.log(user.friends);

        const res = await axios.put("http://localhost:5000/api/auth/" + user._id,
            {
                friends,
                friendreq
            }
        )
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        {
            const friends = frienduser.friends;
            const sentreq = frienduser.sentreq;
            sentreq.splice(sentreq.indexOf(user._id), 1);
            
            friends.push(user._id);
            const res = await axios.put("http://localhost:5000/api/auth/" + frienduser._id,
                {
                    friends,
                    sentreq
                }
            )
        }
        setacc(true);
    }
    const handleDlt = async () => {
        const sentreq = frienduser.sentreq;
        sentreq.splice(sentreq.indexOf(user._id), 1);
        await axios.put(("http://localhost:5000/api/auth/" + frienduser._id), { sentreq });

        const friendreq = user.friendreq;
        friendreq.splice(friendreq.indexOf(request), 1);
        const res = await axios.put("http://localhost:5000/api/auth/" + user._id,
            {
                // friends,
                friendreq
            }
        )
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    }
    // console.log(frienduser);
    return (
        <>
            <li style={{ backgroundColor: 'rgb(216,224,231)', borderRadius: '5px', padding: '5px 10px', marginTop: '10px' }}>
                <Link to={`/profile/${frienduser._id}`}>
                    <div className='detail'>
                        {/* <img src='/assets/design.png' alt=''></img> */}
                        {frienduser.profilePicture ? <img src={PF + frienduser.profilePicture} alt="kjn" /> : <img src={PF + "defaultimg.png"} alt="nm" />}
                        <span>{frienduser.firstname + " " + frienduser.lastname}</span>
                    </div>
                </Link>
                <div className='accept'>
                    {acc ? <>
                        <button>Friends</button>
                    </> : <>
                        <button onClick={handleAcc}>Accept</button>
                        <button onClick={handleDlt}>Delete</button>
                    </>}

                </div>
            </li>
        </>
    )
}
