import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const ExercisesShow = () => {

  const { id } = useParams()

  // State

  const [ exercise, setExercise ] = useState(null)
  const [ errors, setErrors ] = useState(false)

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
      <div>
          {exercise ?
            <>
              <div>
                <h1>{exercise.name}</h1>
                <hr />
              </div>
              <div>
                <iframe width="1280" height="720" src= {`https://www.youtube.com/embed/${exercise.video}`}  title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div md="6">
                <p>Muscle Groups: {exercise.groups.map((group) => {
            const { name } = group
            return (
              <div key={id} md='6' lg='4' className='mb-4'>
                {/* <Link to={`/exercises/${id}`}> */}
                      <h1>
                        {name}
                      </h1>
                {/* </Link> */}
              </div>
            )
          })}</p>
                <hr />
                <h2>Description</h2>
                <p>{exercise.description}</p>
                <hr />
                <h2>How to do:</h2>
                <p>{exercise.how_to_do}</p>
                <hr />
                <img alt={`This is a ${exercise.name}`} src={exercise.image} />
                <hr />
                <h2>Sets: </h2>
                <p>{exercise.sets}</p>
                <hr />
                <h2>Experts say:</h2>
                <p>{exercise.expert_opinions}</p>
                <hr />
                <Link to="/exercises" className='btn btn-danger'>Back to exercises</Link>
              </div>
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

export default ExercisesShow