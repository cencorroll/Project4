import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

// Components
import EmailIcon from '@mui/icons-material/Email'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography, Button, Stack } from '@mui/material'
// import { Nav, Navbar } from 'react-bootstrap'

import { userIsAuthenticated } from './components/Auth/helpers/auth'

const drawerWidth = 240

export default function PageNavBar(props) {
  const Navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    Navigate('/login')
  }

  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div className='collapse-bar'>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography
          style={{ color: 'white' }}
          variant="h6"
          sx={{ my: 2 }}
        >
          Fitness Database
        </Typography>
        <Divider />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >

          {/* I left the mui button tag even though I don't need it because I just like the styling more. */}

          <Link className='collapse-link' to='/'><Button>Home</Button></Link>
          <Link className='collapse-link' to='/profile'><Button><AccountCircleIcon /></Button></Link>
          <Link className='collapse-link' to='/workouts/add'><Button>Add your Workout</Button></Link>
          <Button><a href="mailto:aharunddad@gmail.com" style={{ color: 'white' }}><EmailIcon /></a></Button>
        </Stack>
      </Box>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (

    <Box className='navbar-container' sx={{ display: 'flex' }}>
      <AppBar style={{ backgroundColor: '#707070', height: '0' }}>
        <Toolbar style={{ backgroundColor: '#707070' }} className='navbar'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >

            <Link to='/'
              style={{
                textDecoration: 'none'
              }}
            >
              <Button
                style={{
                  color: 'white',
                  fontSize: '1.3em'
                }}>
                Home
              </Button>
            </Link>
          </Typography>

          <div className='icons-navbar'>
            {userIsAuthenticated() ?
              <>
                <Link to='/workouts/add'
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <Button
                    style={{
                      color: 'white',
                      fontSize: '1em',
                      marginRight: '1em'
                    }}>
                    Add your workout
                  </Button>
                </Link>
                
                <Button
                  onClick={handleLogOut}
                  style={{
                    color: 'white',
                    fontSize: '1em'
                  }}>
                  LOG OUT
                </Button>

                <Link to='/profile'
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <Button
                    style={{
                      color: 'white',
                    }}>
                    <AccountCircleIcon style={{ fontSize: '20px' }}/>
                  </Button>
                </Link>
              </>
              :
              <>
                <Link to="/register"><Button style={{color: 'white', fontSize: '1.3em' }}>Register</Button></Link>
                <Link to="/login"><Button style={{color: 'white', fontSize: '1.3em' }}>Login</Button></Link>
              </>
            }
            <Button
              variant='link'
              color='default'
              className='link-icons'
              startIcon={<EmailIcon />}
              href='mailto:aharundd@gmail.com'
            />
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  )
}
