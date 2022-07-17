import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, TextField, Grid, Button, CssBaseline, Avatar, } from '@mui/material'

export default function Register() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    profile_image: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ mb: '20px' }} />

        <Typography component="h1" variant="h5" style={{ fontSize: '2.3em' }}>
          Create an Account
        </Typography>

        <Box component="form" autoComplete='off' onSubmit={handleSubmit} sx={{ mt: 1 }} style={{ width: '100%' }}>


          {/* Username */}
          <Grid  xs={12}>
            <TextField
              name="username"
              required
              fullWidth
              id="username"
              label={<Typography variant="headline" component="h4"> Username </Typography>}
              autoFocus
              value={formData.username}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '10px' }}
            />
            {errors.username
              ?
              <Grid  xs={12}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.username}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          {/* Email */}
          <Grid  xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={<Typography variant="headline" component="h4"> Email </Typography>}
              name="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '10px' }}
            />
            {errors.email
              ?
              <Grid  xs={12}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.email}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          {/* First Name */}
          <Grid  xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name='first_name'
              label={<Typography variant="headline" component="h4"> First Name </Typography>}
              type="first-name"
              id="first-name"
              value={formData.first_name}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '10px' }}
            />
            {errors.first_name
              ?
              <Grid  xs={6}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.first_name}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          {/* Last Name */}
          <Grid  xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name='last_name'
              label={<Typography variant="headline" component="h4"> Last Name </Typography>}
              type="last-name"
              id="last-name"
              value={formData.last_name}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '10px' }}
            />
            {errors.last_name
              ?
              <Grid  xs={6}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.last_name}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          {/* Password */}
          <Grid  xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={<Typography variant="headline" component="h4"> Password </Typography>}
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '20px' }}
            />
            {errors.password
              ?
              <Grid  xs={6}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.password}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          {/* Password Confirmation */}
          <Grid  xs={6}>
            <TextField
              required
              fullWidth
              name="password_confirmation"
              label={<Typography variant="headline" component="h4"> Password Confirmation </Typography>}
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '10px' }}
            />
            {errors.password_confirmation
              ?
              <Grid  xs={6}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.password_confirmation}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          {/* Profile Image */}
          <Grid  xs={12}>
            <TextField
              required
              fullWidth
              name="profile_image"
              label={<Typography variant="headline" component="h4"> Profile Image </Typography>}
              type="profile-image"
              id="profile-image"
              value={formData.profile_image}
              onChange={handleChange}
              inputProps={{ style: { fontSize: 15 } }}
              sx={{ mt: '10px' }}
            />
            {errors.profile_image
              ?
              <Grid  xs={12}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{errors.profile_image}</Typography>
                </Container>
              </Grid>
              :
              <div style={{ height: '0' }}></div>
            }
          </Grid>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ fontSize: '1.5em' }}
          >
            Sign Up
          </Button>

        </Box>
      </Box>
    </Container>
  )
}
