import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, FormControl, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ExercisesIndex = () => {

  const [exercises, setExercises] = useState([])
  const [errors, setErrors] = useState(false)
  const [filters, setFilters] = useState({
    exercise: 'All',
    searchTerm: '',
    group: 'All',
  })
  const [filteredExercises, setFilteredExercises] = useState([])

  useEffect(() => {
    const getExercises = async () => {
      try {
        const { data } = await axios.get('/api/exercises/')
        setExercises(data)
      } catch (error) {
        console.log(error.response.data)
        setErrors(true)
      }
    }
    getExercises()
  }, [])

  //? searchbar filter
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (exercises.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = exercises.filter(exercise => {
        return regexSearch.test(exercise.name) || regexSearch.test(exercise.groups) || (filters.name === 'All')
      })
      setFilteredExercises(filtered)
    }
  }, [filters, exercises])
  filteredExercises.sort()

  // //? Favorite button function
  // const setTokenToLocalStorage = (token) => {
  //   window.localStorage.setItem('fitness-app', token)
  // }
  // const handleLike = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const { data } = await axios.post('/api/auth/login/')
  //     setTokenToLocalStorage(data.token)
  //     console.log(data.token)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <>
      <Form>
        <Form.Group className='search'>
          <FormControl className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Find an exercise" onChange={handleChange} />
        </Form.Group>
      </Form>

      <Container>
        <Row>
          {exercises ?
            <>
              {filteredExercises.map((exercise) => {
                const { id, name, image } = exercise
                return (
                  <Col key={id} md='6' lg='4' className='mb-4'>
                    <Card style={{ width: '18rem' }}>
                      <Link to={`/exercises/${id}`}>
                        <Card.Img className='exercises-index-image' variant="top" src={image} />
                        <Card.Body className='bd-light'>
                          <Card.Title className='text-center mb-0'>{name}</Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                )
              })}
            </>
            :
            <div className='text-center'>
              {errors ? 'Something went wrong! Please try again later!' : <h2>Loading...</h2>}
            </div>
          }
        </Row>
      </Container>
      :

    </>
  )
}



export default ExercisesIndex