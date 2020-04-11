import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, blogs, setBlogs }) => {

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
    }
    catch(e){
      console.log(e)
    }
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
        </div>}
        
    </div>
  )
}
export default Blog
