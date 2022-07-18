import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Row, FormControl, Form, Button } from 'react-bootstrap'
import { Container, TextField, Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Collapse, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'

import { Link } from 'react-router-dom'

const WorkoutIndex = () => {

  const [errors, setErrors] = useState(false)
  const [workouts, setWorkouts] = useState([])
  const [filters, setFilters] = useState({
    exercise: 'All',
    searchTerm: '',
    group: 'All',
  })
  const [filteredWorkouts, setFilteredWorkouts] = useState([])
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))

  // Get all workouts
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const { data } = await axios.get('/api/workouts/')
        console.log(data)
        setWorkouts(data)
      } catch (error) {
        console.log(error.response.data)
        setErrors(true)
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
    <section className='workouts-page'>
      <Container maxWidth='lg'>
        <TextField
          id='outlined-basic'
          label={<Typography variant="headline" component="h4"> Find a Workout... </Typography>}
          variant='outlined'
          fullWidth
          className='searchbar'
          name='searchTerm'
          autoComplete='off'
          onChange={handleChange}
          value={filters.searchTerm}
          inputProps={{ style: { fontSize: 20 } }}
        />
      </Container>

      <div className='workout-grid'>
        {filteredWorkouts ?
          <>
            {filteredWorkouts.map((workout) => {
              const { id, name, exercises } = workout
              return (
                <Card className='workout-container'>
                  <Link className='workout-link' to={`/workouts/${id}`}>
                    <Typography gutterBottom variant="h4" component="div">
                      {name}
                    </Typography>
                  </Link>
                  <CardContent>
                  </CardContent>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className='workout-exercises'>
                      {/* Link to page of all exercises with that group */}
                      {
                        exercises.map((exercise) => {
                          const { id, name, image } = exercise
                          return (
                            <Link key={id} to={`/exercises/${id}`}>
                              <Card className='card'>
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={image}
                                  alt="green iguana"
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                    {name}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Link>
                          )
                        })
                      }
                    </CardContent>
                  </Collapse>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon sx={{ fontSize: "40px" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon sx={{ fontSize: "40px" }} />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon sx={{ fontSize: "40px" }} />
                    </ExpandMore>
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
    </section>


  )
}

export default WorkoutIndex
