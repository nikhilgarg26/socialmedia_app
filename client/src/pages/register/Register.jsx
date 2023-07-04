import React, { useRef } from 'react'
import './Register.css'
import axios from 'axios';

export default function Register() {

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const repassRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data={
        firstname: fnameRef.current.value,
        lastname: lnameRef.current.value,
        email:emailRef.current.value,
        password:passRef.current.value,
      }
      // console.log(data);
      // if (passRef.current.value === repassRef.current.value) {
        const res = await axios.post('http://localhost:5000/api/auth/register',data);
          res.data && window.location.replace("/login");
      // }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div class="container flex justify-center content-center mt-[55px] ">
      <div class="right flex flex-col bg-white p-4 rounded-lg shadow-md w-[25%] relative">
        <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="text" placeholder="First Name" ref={fnameRef}/>
        <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="text" placeholder="Last Name" ref={lnameRef}/>
        <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="text" placeholder="Email address or phone number" ref={emailRef}/>
        <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="password" placeholder="Password" ref={passRef}/>
        <input class="outline-blue-600 border-2 rounded-md mb-[12px] p-2 text-lg" type="password" placeholder="Re-Enter Password" ref={repassRef}/>
        <button class="btn bg-blue-500 p-2 rounded-md text-white font-bold text-lg mb-[12px]" onClick={handleSubmit}>Create Account</button>
        {/* <a href='' class="hover:underline decoration-1 text-blue-500 m-auto mb-[12px]">Forgotten password?</a> */}
        <hr class="mt-[12px] mb-[12px]" />
      </div>
    </div>
  )
}
