import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useState } from 'react';
import { Card } from 'semantic-ui-react';
import axios from 'axios';
import './Topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const freq = user.friendreq;

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const PF = "http://localhost:5000/images/"

  const navigate = useNavigate();

  // Search User
  const searchItems = async () => {

    if (searchInput !== '') {
      const res = await axios.get("http://localhost:5000/api/auth/?filter=" + searchInput);

      setFilteredResults(res.data);
    }
    else {
      setFilteredResults([]);
    }
  }

  const handleLogout = async () => {
    await axios.get('http://localhost:5000/logout', { withCredentials: true })
    .then(response => {
      if (response.status === 200) {
        // Redirect user to login page or perform other logout actions
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      } else {
        // Handle logout failure
        console.error('Logout failed');
      }
    })
    .catch(error => {
      // Handle logout failure
      console.error('Logout failed:', error);
    });
  };

  return (
    <div className='topbar'>
      <div className='leftcont'>
        <Link to="/">
          <span>Famebook</span>
        </Link>
      </div>
      <div className='centercont'>
        <input type="text" name="search" placeholder="Search Famebook" onChange={(e) => setSearchInput(e.target.value)} />
        <button><SearchIcon className='search' onClick={searchItems} /></button>
        <div className='list'>
          <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
            {searchInput.length > 1 && (
              filteredResults.map((item) => {
                return (
                  <Card>
                    <Link to={`/profile/${item._id}`}>
                      <Card.Content className='bg'>
                        {item.profilePicture ? <img src={PF + item.profilePicture} alt="kjn" /> : <img src={PF + "defaultimg.png"} alt="nm" />}
                        <Card.Header>{item.firstname + " " + item.lastname}</Card.Header>
                      </Card.Content>
                    </Link>
                  </Card>
                )
              })
            )}
          </Card.Group>
        </div>
      </div>
      <div className='rightcont'>
        <Link to={`/profile/${user._id}`}>
          <div className='self icon'>
            {/* <img src="/assets/design.png" alt="" /> */}
            {user.profilePicture ? <img src={PF + user.profilePicture} alt="kjn" /> : <img src={PF + "defaultimg.png"} alt="nm" />}
            <span>{user.firstname}</span>
          </div>
        </Link>
        <GroupIcon className='icon' />
        <span>{"1234"}</span>
        <QuestionAnswerIcon className='icon' />
        <NotificationsIcon className='icon' />
        <div className='logout icon' style={{ cursor: 'pointer' }} onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}
