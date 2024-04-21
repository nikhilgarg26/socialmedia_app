import React, { useContext} from 'react'
import './Rightbar.css'
import Reqcard from '../reqcard/Reqcard'
import { Context } from '../../context/Context';

export default function Rightbar() {
  const { user } = useContext(Context);
  const req=user.friendreq;
  // console.log(req);

  return (
    <div className='rightbar'>
      <h4 style={{ margin: '5px 10px' }}>Friend Requests</h4>
      <ul>
      {req.map((p)=>(
                <Reqcard request={p}/>
            ))}
      </ul>
    </div>
  )
}
