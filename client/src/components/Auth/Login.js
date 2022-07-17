import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Components
import {  Link, Container, Box, Typography, TextField, Grid, Button, CssBaseline, Avatar,  } from '@mui/material'


export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      window.localStorage.setItem('token', data.token)
      console.log(data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  // ? Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontSize: '2.3em' }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ width: '100%'}}>
          
          {/* Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={<Typography variant="headline" component="h4"> Email </Typography>}
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            inputProps={{style: {fontSize: 20}}}
          />

          {/* Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={<Typography variant="headline" component="h4"> Password </Typography>}
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            inputProps={{style: {fontSize: 20}}}
          />
          {errors
            ?
            <Grid item xs={12}>
              <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ color: 'red' }}>Unauthorised.</Typography>
              </Container>
            </Grid>
            :
            <div style={{ height: '0' }}></div>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ fontSize: '1.5em' }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link style={{ fontSize: '1.5em' }} href="/register" variant="body2">
                No account yet? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  )
}
