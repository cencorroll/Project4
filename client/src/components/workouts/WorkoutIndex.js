import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, FormControl, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const WorkoutIndex = () => {

  const [workouts, setWorkouts] = useState([])
  const [filters, setFilters] = useState({
    exercise: 'All',
    searchTerm: '',
    group: 'All',
  })
  const [filteredWorkouts, setFilteredWorkouts] = useState([])

// Get all workouts
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const { data } = await axios.get('/api/workouts/')
        setWorkouts(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getWorkouts()

    // searchbar filter
    const handleChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value })
    }
    useEffect(() => {
      if (workouts.length) {
        const regexSearch = new RegExp(filters.searchTerm, 'i')
        const filtered = workouts.filter(workout => {
          return regexSearch.test(workout.name) || regexSearch.test(workout.groups) || (filters.name === 'All')
        })
        setFilteredWorkouts(filtered)
      }
    }, [filters, workouts])
    filteredWorkouts.sort()

  }, [])
  return (
    <div>WorkoutIndex</div>
  )
}

export default WorkoutIndex
