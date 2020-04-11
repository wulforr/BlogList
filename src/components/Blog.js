import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, blogs, setBlogs, setErrMessage, setSuccessMessage }) => {

  const [visible,setVisible] = useState(false)
  const blogStyle = {
    paddingTop:10,
    paddingLeft:2,
    border: 'solid',
    borderWidth:1,
    marginBottom:5
  }

  const updateLikes = async () => {
    const newBlog = {...blog,likes:blog.likes+1}
    console.log(newBlog)
    try{
      const res = await blogService.updateLikes(newBlog)
      console.log(res)
      const newBlogs = blogs.map(ele => {
        if(ele.id === blog.id)
          return newBlog
        return ele
      })
      newBlogs.sort((a,b) => b.likes-a.likes)
      setBlogs(newBlogs)
      setSuccessMessage('updated Successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
    }
    catch(e){
      setErrMessage(`Updatinf failed cause ${e}`)
      setTimeout(() => {
        setErrMessage(null)
      }, 5000);
    }
  }

  const deleteBlog = async () => {
    try{
      const res = await blogService.deleteBlog(blog.id)
      console.log(res)
      const newBlogs = blogs.filter((ele) => ele.id !== blog.id )
      setBlogs(newBlogs)
      setSuccessMessage('Deleted Successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
    }
    catch(e){
      setErrMessage(`Updatinf failed cause ${e}`)
      console.log(e)
      setTimeout(() => {
        setErrMessage(null)
      }, 5000);    }
  }

  return(

    <div style={blogStyle} >
      {blog.title} 
      {
        !visible ? <button onClick = {() => {setVisible(true)} }>View</button> : <button onClick={() => {setVisible(false)} } >Hide</button>
      }
      {visible && <div>
        <p>
          {blog.author}
        </p>
        <p>
          {blog.likes}<button onClick= {updateLikes} >Like</button>
        </p>
        <p>
          {blog.url}
        </p>
        <button style = {{backgroundColor:'blue',padding:'5px 10px',color:'white'}} onClick={deleteBlog} >Delete</button>
        </div>}
        
    </div>
  )
}
export default Blog
