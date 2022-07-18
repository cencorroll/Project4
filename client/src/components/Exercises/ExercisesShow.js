import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Box, Paper, Typography, Button } from '@mui/material'

const ExercisesShow = () => {

  const { id } = useParams()

  // State

  const [exercise, setExercise] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getExercise = async () => {
      try {
        const { data } = await axios.get(`/api/exercises/${id}`)
        console.log(data)
        setExercise(data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
    }
    getExercise()
  }, [id])

  return (
    <>
      {exercise ?
        <>
          <div className='exercise-show-page'>
            <div className='header-section'>
              <h1>{exercise.name}</h1>
              <div className='subheader-text'>Muscle groups:
                {exercise.groups.map((group) => {
                  const { name } = group
                  return (
                    <div className='group-text'>{name}</div>
                  )
                })}
              </div>
              <div className='sets'>{exercise.sets} sets</div>
            </div>

            <hr />

            <div className='boxes'>
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
                  <Typography style={{ fontSize: '2em' }}>What is it?</Typography>
                  <Typography style={{ fontSize: '1.5em' }}>{exercise.description}</Typography>
                </Paper>
              </Box>

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
            </div>


            <div className='media'>
              <div className='youtube'>
                <iframe width="640" height="360" src={`https://www.youtube.com/embed/${exercise.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>

            <hr />

            <Box
                className='exercise-show-box'
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 2,
                    maxWidth: '100%',
                    padding: '1.5em'
                  },
                }}
              >
                <Paper elevation={3}>
                  <Typography style={{ fontSize: '2em' }}>Abdallah says:</Typography>
                  <Typography style={{ fontSize: '1.5em' }}>{exercise.expert_opinions}</Typography>
                </Paper>
              </Box>


            <Button>Add to your Workout</Button>
            <Link to="/exercises" ><Button>Back to exercises</Button></Link>
          </div>
        </>
        :
        <div className='text-center'>
          {errors ? 'Something went wrong! Please try again later!' : <h2>Loading...</h2>}
        </div>
      }
    </>
  )
}

export default ExercisesShow