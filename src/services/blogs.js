import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blogInfo) => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,blogInfo,config)
  return response.data
}

const updateLikes = async (blogInfo) => {
  const response = await axios.put(`${baseUrl}/${blogInfo.id}`,blogInfo)
  return response.data
}

export default { setToken, getAll, addBlog, updateLikes }