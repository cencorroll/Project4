import './App.css'
import '../src/styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExercisesIndex from './components/Exercises/ExercisesIndex';
import ExercisesShow from './components/Exercises/ExercisesShow';
import Register from './components/Auth/Register'
import PageNavBar from './PageNavBar'
import Login from './components/Auth/Login'

function App() {
  return (
    <BrowserRouter>
      <PageNavBar />
      <Routes>
        <Route path='/exercises' element={<ExercisesIndex /> } />
        <Route path='/exercises/:id' element={<ExercisesShow /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
