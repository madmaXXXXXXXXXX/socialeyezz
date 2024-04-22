import React from 'react'
import '../App.css'
import Feeds from './Feeds'
import CreatePost from './CreatePost'
import Stories from './Stories'

function Post() {
  return (
    <div className='middle'>
      <Stories />
        <CreatePost />
        <Feeds />
    </div>
  )
}

export default Post