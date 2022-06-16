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
        console.log(data)
        setWorkouts(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getWorkouts()
  }, [])

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
  return (
    <>
      <Form>
        <Form.Group className='search'>
          <FormControl className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Find an exercise" onChange={handleChange} />
        </Form.Group>
      </Form>

      <section className='workouts-container'>
        <Row>
          {filteredWorkouts.map((workout) => {
            const { id, name, exercises } = workout
            return (
              <div key={id} >
                <div style={{ width: '18rem' }}>
                  <Link to={`/workouts/${id}`}>
                    <div className='exercise-within-workout'>
                      <div><h1>{name}</h1></div>
                      {exercises.map((exercise) => {
                        const { name, id, image } = exercise
                        return (
                          <div key={id} className='row'>
                            <h3>{name}</h3>
                            <img className='workout-page-image' alt={`This is a ${name}`} src={image} />
                          </div>
                        )
                      })}

                    </div>
                  </Link>
                  <Button variant="primary">Add to your Workout</Button>
                </div>
              </div>
            )
          })}
        </Row>
      </section>
    </>
  )
}

export default WorkoutIndex
