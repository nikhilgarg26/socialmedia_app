import React, { useContext } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios';

export default function Login() {

  const userRef=useRef();
  const passRef=useRef();
  const {dispatch,isFetching}=useContext(Context);
  // console.log(isFetching);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try { 
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: userRef.current.value,
        password: passRef.current.value,
      });
      console.log('success');
      // console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }

  }

  return (
    <div class="container flex justify-center content-center mt-48 ">
      <div class="left mx-10">
        <img class="w-3/5 p-0 m-0" src="/facebook/logo.svg" alt="" />
          <p class="text-[28px] px-8 leading-snug">Famebook helps you connect and share <br/> with the people in your life.</p>
      </div>
      <div class="right flex flex-col bg-white p-4 rounded-lg shadow-md w-[25%] relative">
        <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="text" placeholder="Email address or phone number" ref={userRef} />
          <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="password" placeholder="Password" ref={passRef}/>
            <button class="btn bg-blue-500 p-2 rounded-md text-white font-bold text-lg mb-[12px]" 
              onClick={handleSubmit} disabled={isFetching}>Log in</button>
            {/* <a href="#" class="hover:underline decoration-1 text-blue-500 m-auto mb-[12px]">Forgotten password?</a> */}
            <hr class="mt-[12px] mb-[12px]" />
            <Link to='/register' class="btn bg-green-500 p-2 rounded-md text-white w-fit mx-auto font-bold text-lg mb-[12px] mt-[12px]"><button >Create new account</button></Link>     
      </div>
    </div>
  )
}
