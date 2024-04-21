import React, { useContext, useState } from 'react'
import './Reqcard.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { Context } from '../../context/Context';

export default function Reqcard({ request }) {

    const [acc, setacc] = useState(false);

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
        user.friends.push(request);

        user.friendreq.splice(user.friendreq.indexOf(request), 1);

        const res = await axios.post("http://localhost:5000/api/friend/accept",
            {
                friendreqid: request
            }, { withCredentials: true }
        )
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        setacc(true);
    }
    const handleDlt = async () => {

        user.friendreq.splice(user.friendreq.indexOf(request), 1);

        const res = await axios.post("http://localhost:5000/api/friend/delete",
            {
                friendreqid: request
            }, { withCredentials: true }
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
