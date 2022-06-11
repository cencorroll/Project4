import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap'

const ExercisesIndex = () => {

  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const getExercises = async () => {
      try {
        const { data } = await axios.get('/api/exercises/')
        setExercises(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getExercises()
  }, [])

  return (
    <Container>
        <Row>
          {exercises.map((exercise) => {
            const { id, name, image } = exercise
            return (
              <Col key={id} md='6' lg='4' className='mb-4'>
                {/* <Link to={`/cities/${_id}`}> */}
                  <Card>
                    <Card.Body className='bd-light'>
                      <Card.Title className='text-center mb-0'>
                        {name}
                      </Card.Title>
                      <Card.Img variant='top' src={image} />
                    </Card.Body>
                  </Card>
                {/* </Link> */}
              </Col>
            )
          })}
        </Row>
      </Container>
  )
}

export default ExercisesIndex