import React, { useState, useEffect, useCallback } from 'react'
import { getTokenFromLocalStorage, getUserId } from '../Helpers/auth'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function Profile() {

  const [profile, setProfile] = useState()
  const [errors, setProfileErrors] = useState(false)
  const [jobs, setJobs] = useState([])
  const [jobErrors, setJobErrors] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/user/', {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
        console.log(data)
        setProfile(data)
      } catch (error) {ß
        setProfileErrors(true)
      }
    }
    getUser()
  }, [])

  return (
    <div>Profile</div>
  )
}
