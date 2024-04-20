import React from 'react'

export default function ({ meme }) {
    return (
        <div className='displayposts'>
            <div className='topost'>
        <img src={meme.url}></img>
            </div>
        </div>
    )
}
