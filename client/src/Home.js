import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <main className='homepage'>
      <section className='main-hp'>
        <div className='banner-hp'>
          <div className='links-hp'>
            <Nav.Link className='exerciseslink' as={Link} to='/exercises'>Exercises</Nav.Link>
            <Nav.Link className='workoutslink' as={Link} to='/workouts'>Workouts</Nav.Link>
          </div>
        </div>
        <div className='created-by'>
          <h3>Created by Abdallah Harun</h3>
          {/* Github Icon */}
        </div>
      </section>
    </main>
  )
}
