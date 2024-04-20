import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Leftbar.css'
import Meme from '../Meme/Meme';
import { Context } from '../../context/Context';
import PacmanLoader from 'react-spinners/PacmanLoader';

export default function Leftbar() {

  const [loading, setloading] = useState(false);

  const [memelist, setlist] = useState([]);
  const { user } = useContext(Context);
  useEffect(() => {
    setloading(true);
    const fetchmeme = async () => {
      const res = await axios.get("http://localhost:5000/api/meme");
      setlist(res.data);
      // console.log(res);
      if (res.status === 200) {
        setloading(false);
      }
    }
    fetchmeme();
  }, [user])

  // console.log(memelist);
  return (
    <>
      {loading ? <PacmanLoader size={20} color="#5e88fb"></PacmanLoader>: <div>
    <p className='head'>Meme Master</p>
      {memelist.map((meme) => (
        <Meme meme={meme}></Meme>
      ))}
    </div> }
    </>

  )
}
