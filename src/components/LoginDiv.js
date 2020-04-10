import React, {useState} from 'react'
import blogService from '../services/blogs' 
import loginHandler from '../services/login'


const LoginDiv = ({setUser, setErrMessage}) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

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

export default LoginDiv