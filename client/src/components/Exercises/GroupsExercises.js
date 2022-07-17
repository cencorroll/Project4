import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Container, Row, Col, Card } from 'react-bootstrap'
import { Typography, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'

import { Link } from 'react-router-dom'

export default function GroupsExercises() {
  
  const [exercises, setExercises ] = useState([])
  // const [groupExercises, setGroupExercises] = useState([])
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

  // const { id } = useParams()

  useEffect(() => {
    const getExercises = async () => {
      try {
        const { data } = await axios.get(`/api/exercises`)
        setExercises(data)
      } catch (error) {
        console.log(error.response.data)
        setErrors(true)
      }
    }
    getExercises()
  }, [])

  // useEffect(() => {
  //   if (exercises.group === group) {
  //     return 
  //   }
  // })

  return (
    <Grid container spacing={2}>
        <Grid xs={6}>
          {exercises ?
            <>
              {exercises.map((exercise) => {
                const { id, name, image, groups } = exercise
                return (
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                      title={name}
                    />
                    <Link to={`/exercises/${id}`}>
                      <CardMedia
                        component="img"
                        height="194"
                        image={image}
                        alt="Paella dish"
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="headline" component='h4' color="text.secondary">
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
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Link to={`/exercises/${id}`}>
                          <Typography paragraph>More information</Typography>
                        </Link>
                      </CardContent>
                    </Collapse>
                  </Card>
                )
              })}
            </>
            :
            <div className='text-center'>
              {errors ? 'Something went wrong! Please try again later!' : <h2>Loading...</h2>}
            </div>
          }
        </Grid>
      </Grid>
  )
}
