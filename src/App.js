import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginHandler from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [User,setUser] = useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
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
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      userName,password
    }
    try{
      const user = await loginHandler(credentials)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    }
    catch(e){
      setErrMessage('Username or Password is incorrect')
      setTimeout(() => {
        setErrMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setSuccessMessage('logged Out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000);
  }
  const loginDiv = () => {
    return(
      <div>
        <h2>Log in to application</h2>
        <form>
          username: <input 
          value = {userName}
          onChange={(e) => setUserName(e.target.value)} />
          password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} >Login</button>
        </form>
      </div>
    )
  }


  const handleAddBlog = async (e) => {
    e.preventDefault()
    const blogInfo = {title, author, url}
    try{
      const newBlog = await blogService.addBlog(blogInfo)
      console.log(newBlog)
      setSuccessMessage(`new Blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
      setTitle('')
      setAuthor('')
      setUrl('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    catch(e){
      console.log(e)
      setErrMessage('There was some problem adding the blog')
    }

  }

  const addBlog = () => {
    return(
      <form>
        <div>
        title <input value={title} onChange = {(e) => setTitle(e.target.value)} />
        </div>
        <div>
        author <input value={author} onChange = {(e) => setAuthor(e.target.value)} />
        </div>
        <div>
        url <input value={url} onChange = {(e) => setUrl(e.target.value)} />
        </div>
        <button onClick={handleAddBlog} >Add Blog</button>
      </form>
    )
  }

  const blogDiv = () => {
    return(
      <div>
        <div>
        <h2>blogs</h2>
        <p>{User.name} logged in</p>
        <button onClick = {handleLogout} >logout</button>
        {addBlog()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      </div>
    )
  }

  return (
    <div>
      {errMessage && <div className='errMessage' >{errMessage}</div>}
      {successMessage && <div className='successMessage' >{successMessage}</div>}
      {User ? blogDiv() : loginDiv()}
    </div>
  )
}

export default App