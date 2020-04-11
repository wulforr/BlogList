import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import LoginDiv from './components/LoginDiv'
import Togglable from './components/Togglable'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [User,setUser] = useState(null)
  const [errMessage,setErrMessage] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      {
        blogs.sort((a,b) => b.likes-a.likes)
        setBlogs( blogs )
      }
    )  
  }, [])



  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setSuccessMessage('logged Out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000);
  }


  const blogFromRef = React.createRef()



  const blogDiv = () => {
    return(
      <div>
        <div>
        <h2>blogs</h2>
        <p>{User.name} logged in</p>
        <button onClick = {handleLogout} >logout</button>
        <Togglable btnlabel='Add Blog' ref={blogFromRef}>
          <AddBlog setErrMessage={setErrMessage} setSuccessMessage ={setSuccessMessage} blogs= {blogs} setBlogs={setBlogs} blogFromRef={blogFromRef} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        )}
      </div>
      </div>
    )
  }

  return (
    <div>
      {errMessage && <div className='errMessage' >{errMessage}</div>}
      {successMessage && <div className='successMessage' >{successMessage}</div>}
      {User ? blogDiv() : <LoginDiv setUser={setUser} setErrMessage={setErrMessage} />}
    </div>
  )
}

export default App