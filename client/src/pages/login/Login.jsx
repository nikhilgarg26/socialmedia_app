import React, { useContext, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios';
import PacmanLoader from "react-spinners/PacmanLoader"

export default function Login() {

  const [loading, setloading] = useState(false);

  const userRef = useRef();
  const passRef = useRef();
  const { dispatch } = useContext(Context);
  // console.log(isFetching);

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: userRef.current.value,
        password: passRef.current.value,
      }, {withCredentials: true});
      // console.log(res);
      // console.log(res);
      if (res.status === 200) {

        setTimeout(() => {
          setloading(false);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }, 1500)
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
    // navigate("/");

  }

  return (

    <div className='login'>
      {loading ? <PacmanLoader size={30} color="#5e88fb"></PacmanLoader> :
        <div class="container flex justify-between content-center flex-col items-center">
          <div class="left mx-10 text-center">
            <p class="text-[28px] px-8 leading-snug">Social Media App <br /> Connect ...</p>
          </div>
          <div class="right flex flex-col bg-white p-4 rounded-lg shadow-md w-[25%] relative">
            <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="text" placeholder="Email address or phone number" ref={userRef} />
            <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="password" placeholder="Password" ref={passRef} />
            <button class="btn bg-blue-500 p-2 rounded-md text-white font-bold text-lg mb-[12px]"
              onClick={handleSubmit}>Log in</button>
            <hr class="mt-[12px] mb-[12px]" />
            <Link to='/register' class="btn bg-green-500 p-2 rounded-md text-white w-fit mx-auto font-bold text-lg mb-[12px] mt-[12px]"><button >Create new account</button></Link>
          </div>
        </div>
      }</div>

  )
}
