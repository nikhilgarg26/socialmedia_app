import React, { useContext, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './Share.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Share() {
    const { user } = useContext(Context);

    const PF = "http://localhost:5000/images/";

    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    // console.log(file);

    const handlePost = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            // console.log(filename);
            data.append("name", filename);
            data.append("file", file);
            // console.log(data);
            newPost.img = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (err) { 
                console.log(err);
            }
        }
        try {
            // console.log(newPost);
            await axios.post('http://localhost:5000/api/posts', newPost);
            // console.log(res);
            
            // window.location.replace("/post/" + res.data._id);
          } catch (err) {}
    }

    return (
        <form className='timeline'>
            <div className='topost'>
                <div className='text'>
                    <Link to={`/profile/${user._id}`}>
                        {/* <img src="/assets/design.png" alt="" /> */}
                        {user.profilePicture ? <img src={PF + user.profilePicture} alt="kjn" /> : <img src={PF + "defaultimg.png"} alt="nm" />}
                    </Link>
                    <input type="text" placeholder="What's on your mind ..."
                        onChange={e => setDesc(e.target.value)} />
                </div>

                {file && (
                    <div className='file'><img src={URL.createObjectURL(file)} alt="" /></div>
                )}
                <hr />
                <div className='post'>
                    <div className='photos'>
                        <label htmlFor="fileInput">
                            <AddPhotoAlternateIcon style={{ margin: "10px" }} />
                            <span>Add Photos</span>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <button className='photos' type="submit" onClick={handlePost}>Post</button>
                </div>
            </div>
        </form>
    )
}
