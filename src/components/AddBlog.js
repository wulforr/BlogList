import React, { useState } from 'react'
import blogService from '../services/blogs'


const AddBlog = ({ setSuccessMessage, setErrMessage, setBlogs, blogs, blogFromRef }) => {
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    const handleAddBlog = async (e) => {
        e.preventDefault()
        const blogInfo = {title, author, url}
        try{
          const newBlog = await blogService.addBlog(blogInfo)
          console.log(newBlog)
          blogFromRef.current.toggleVisibility()
          setSuccessMessage(`new Blog ${newBlog.title} by ${newBlog.author} added`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
          setTitle('')
          setAuthor('')
          setUrl('')
          setBlogs(blogs.concat(newBlog))
        }
        catch(e){
          console.log(e)
          setErrMessage('There was some problem adding the blog')
        }
      }
    

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

export default AddBlog