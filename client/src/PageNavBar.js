import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

// bootstrap components
import { Navbar, Nav, Container } from 'react-bootstrap'
import { userIsAuthenticated } from './components/Auth/helpers/auth'

export default function PageNavBar() {
  const Navigate = useNavigate()

  const handleLogOut = () => {
    window.localStorage.removeItem('fitness-app')
    Navigate('/login')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          </Nav>

          {userIsAuthenticated() ?
            <>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </>
            :
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
