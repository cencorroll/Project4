import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../Auth/helpers/auth'
import Select from 'react-select'

import { Container, Row } from 'react-bootstrap'

export default function WorkoutAdd() {

  const [errors, setErrors] = useState(false)
  const [exercises, setExercises] = useState([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    workout: []
  })

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get('/api/exercises')
      setExercises(data)
    }
    getExercises()
  }, [])


  const handleOptions = () => {
    setFormData({ ...formData, exercises: exercises.map((exercise) => exercise.id) })
  }

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // third argument of post request is a config object
      // to add our token auth we add a headers key inside the config object 
      // this contains an object that has an authorization key with a bearer token as a value
      const { data } = await axios.post('/api/workouts/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/profile')
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  return (
    <section className='formpage'>
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-5' onSubmit={handleSubmit}>
            {/* Name */}
            <h2>Name of your Workout</h2>
            <input type="text" name="name" className='input' placeholder='Enter a name' value={formData.name} onChange={handleChange} />
            {errors.name && <p className='text-danger'>{errors.name}</p>}

            {/* Exercises */}
            <h2>Add exercises</h2>

            <Select
              options={exercises.map((exercises) => ({
                id: exercises.id,
                value: exercises.id,
                label: exercises.name,
              }))}
              name='exercises'
              onChange={handleOptions}
            />

            <button type="submit" className="btn btn-secondary w-100 mt-4">Add</button>

          </form>
        </Row>
      </Container>
    </section>
  )
}
