import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage, getPayload, userIsAuthenticated } from './Auth/helpers/auth'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function Profile() {

  const [profile, setProfile] = useState({})
  const [errors, setErrors] = useState(false)
  const { userId } = useParams()
  const token = getTokenFromLocalStorage()

  useEffect(() => {
    // if (!token || !userIsAuthenticated(userId)) {
    //   navigate('/')
    // }

    const getProfile = async () => {
      try {
        const { data } = await axios.get(`/api/auth/user/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        setProfile({ ...profile, ...data })
      } catch (error) {
        console.log(typeof userId)
        console.log(userId)
        console.log(error)
        setErrors(true)
      }
    }
    getProfile()
  }, [])

  //   const getUser = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/auth/profile/${userId}/`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       console.log(token)
  //       setProfile({ ...profile, ...data })
  //     } catch (error) {
  //       console.log(error)
  //       setErrors(true)
  //     }
  //   }
  //   getUser()
  // }, [])



  return (
    <div className='profile-page'>
      <h1>Coming Soon...</h1>
      <img alt='profile excalidraw screenshot' src={require('../excalidraw-profile.png')} />
    </div>
  )
}
