import axios from 'axios'
const baseUrl = '/api/user/login'

const loginHandler = async (credentials) => {
    const response = await axios.post(baseUrl,credentials)
    return response.data
} 

export default loginHandler