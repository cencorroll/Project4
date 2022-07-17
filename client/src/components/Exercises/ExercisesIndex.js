import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Container, Row, Col, Card } from 'react-bootstrap'
import { Container, TextField, Typography, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'

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
        return regexSearch.test(exercise.name) && (exercise.groups === filters.group || filters.group === 'All')
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
    <Container maxWidth='lg'>
      <TextField
        id='outlined-basic'
        label={<Typography variant="headline" component="h4"> Find an Exercise... </Typography>}
        variant='outlined'
        fullWidth
        name='searchTerm'
        autoComplete='off'
        onChange={handleChange}
        value={filters.searchTerm}
        inputProps={{ style: { fontSize: 20 } }}
      />
      </Container>

      <div className='exercise-grid'>
        {exercises ?
          <>
            {filteredExercises.map((exercise) => {
              const { id, name, image, groups } = exercise
              return (
                <Card className='exercise-card'>
                  <CardHeader
                    title={name}
                  />
                  <Link to={`/exercises/${id}`}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={image}
                      alt="Paella dish"
                      className='card-img'
                    />
                  </Link>
                  <CardContent>
                    <Typography
                      variant="headline"
                      component='h4'
                      color="text.secondary"
                    >
                      {/* Link to page of all exercises with that group */}
                      {
                        groups.map((group) => {
                          const { id, name } = group
                          return (
                            <Link key={id} to={`/groups/${name}`}>
                              <div key={id}>
                                {name}
                              </div>
                            </Link>
                          )
                        })
                      }
                    </Typography>
                    <Link to={`/exercises/${id}`}>
                      <Typography paragraph>More information</Typography>
                    </Link>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            })}
          </>
          :
          <div className='text-center'>
            {errors ? 'Something went wrong! Please try again later!' : <h2>Loading...</h2>}
          </div>
        }
      </div>
    </>
  )
}



export default ExercisesIndex