import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Collapse, IconButton, Box, Paper } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'


export default function WorkoutShow() {

  const { id } = useParams()

  const [workout, setWorkout] = useState(null)
  const [errors, setErrors] = useState(false)
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

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const { data } = await axios.get(`/api/workouts/${id}`)
        console.log(data)
        setWorkout(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getWorkout()
  }, [id])

  return (
    <>
      {
        workout ?
          <div className='workout-exercise-grid'>

            <div>
              <h1>{workout.name}</h1><hr />
            </div>

            {/* Link to page of all exercises with that group */}
            {workout.exercises.map((exercise) => {
              const { name, id } = exercise
              return (
                <Card key={id} className='workout-container'>
                  <Link className='workout-exercise-link' to={`/exercises/${id}`}>
                    <Typography style={{ fontSize: '2em', textAlign: 'center', color: 'black' }}>
                      {name}
                    </Typography>
                  </Link>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className='workout-exercises-boxes'>

                      <Link to={`/exercises/${id}`}>
                        <Box
                          className='exercise-show-box'
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                              m: 2,
                              maxWidth: '100%',
                              width: '600px',
                              padding: '1.5em'
                            },
                          }}
                        >
                          <Paper elevation={3}>
                            <Typography style={{ fontSize: '2em' }}>How?</Typography>
                            <Typography style={{ fontSize: '1.5em' }}>{exercise.how_to_do}</Typography>
                          </Paper>
                        </Box>
                      </Link>

                      <CardMedia className='media'>
                        <div className='youtube'>
                          <iframe width="640" height="360" src={`https://www.youtube.com/embed/${exercise.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      </CardMedia>

                    </CardContent>
                  </Collapse>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon sx={{ fontSize: "40px" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon sx={{ fontSize: "40px" }}/>
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon sx={{ fontSize: "40px" }}/>
                    </ExpandMore>
                  </CardActions>
                </Card>
              )
            })}
          </div>
          :
          <div className='text-center'>
            {errors ? 'Something went wrong! Please try again later!' : <h2>Loading...</h2>}
          </div>
      }
    </>
  )
}
