import React from 'react'

export default function NotFound() {
  return (
    <div className='NotFound'>
      <h1>Oops!</h1>
      <h3>
        The page you were looking for was not found.<br/>
        Please try again later.
      </h3>
      <div className='notfound-image'>
        <img src='https://www.travelappeal.com/hubfs/trials/images/broken-robot.png' alt='Broken down robot'/>
      </div>
    </div>
  )
}
