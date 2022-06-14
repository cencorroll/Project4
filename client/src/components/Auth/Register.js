import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

export default function Register() {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirmation: '',
    profile_image: ''
  })

  const [ errors, setErrors ] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  return (
    <section className="form-page">
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5' onSubmit={handleSubmit}>
            <h1>Register</h1>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className='input' placeholder='Username' value={formData.username} onChange={handleChange} />
            {errors.username && <p className='text-danger'>{errors.username}</p>}
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {errors.email && <p className='text-danger'>{errors.email}</p>}
            {/* First Name */}
            <label htmlFor="first_name">First Name</label>
            <input type="first_name" name="first_name" className='input' placeholder='first_name' value={formData.first_name} onChange={handleChange} />
            {errors.first_name && <p className='text-danger'>{errors.first_name}</p>}
            {/* Last Name */}
            <label htmlFor="last_name">Last Name</label>
            <input type="last_name" name="last_name" className='input' placeholder='last_name' value={formData.last_name} onChange={handleChange} />
            {errors.last_name && <p className='text-danger'>{errors.last_name}</p>}
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {errors.password && <p className='text-danger'>{errors.password}</p>}
            {/* Password Confirmation */}
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" className='input' placeholder='Password Confirmation' value={formData.password_confirmation} onChange={handleChange} />
            {errors.password_confirmation && <p className='text-danger'>{errors.password_confirmation}</p>}
            {/* Image Upload*/}
            <label htmlFor="profile_image">Profile Image</label>
            <input type="profile_image" name="profile_image" className='input' placeholder='Image link' value={formData.profile_image} onChange={handleChange} />
            {errors.profile_image && <p className='text-danger'>{errors.profile_image}</p>}
            {/* Submit */}
            <button type="submit" className="btn w-100">Register</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}
