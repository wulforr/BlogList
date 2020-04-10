import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginHandler from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [User,setUser] = useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
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
      console.log(e)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
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
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    catch(e){
      console.log(e)
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
      {User ? blogDiv() : loginDiv()}
    </div>
  )
}

export default App