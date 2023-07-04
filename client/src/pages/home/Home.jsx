import React from 'react'
import './Home.css'
import Leftbar from '../../components/leftbar/Leftbar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'

export default function Home() {
  return (
    <div className='homepage'>
      <div className='section1'><Leftbar /></div>
      <div className='section2'><Timeline /></div>
      <div className='section3'><Rightbar /></div>
    </div>
  )
}
