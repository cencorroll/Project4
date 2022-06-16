import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function WorkoutShow() {

  const { id } = useParams()

  // State

  const [workout, setWorkout] = useState(null)
  const [errors, setErrors] = useState(false)

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
    <div>
      {
        workout ?
          <>
            <div>
              <><h1>{workout.name}</h1><hr /></>
            </div>
            <div>
              <p>Muscle Groups:</p>
              <ul>
                {workout.groups.map((group) => {
                  const { name, i } = group
                  return (
                    <li key={i}>
                      {/* <Link to={`/workouts/${id}`}> */}
                      {name}
                      {/* </Link> */}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              {workout.exercises.map((exercise) => {
                const { name, image, id } = exercise
                return (
                  <div key={id}>
                    <Link to={`/exercises/${id}`}>
                      <h3>
                        {name}
                      </h3>
                      <img alt={`This is a ${name}`} src={image} />
                    </Link>
                  </div>
                )
              })}
            </div>
          </>
          :
          <div className='text-center'>
            {errors ? 'Something went wrong! Please try again later!' : <h2>Loading...</h2>}
          </div>
      }
    </div>
  )
}
