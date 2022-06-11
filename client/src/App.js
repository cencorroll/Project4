// eslint-disable-next-line no-unused-vars
import logo from './logo.svg'
import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExercisesIndex from './components/Exercises/ExercisesIndex';
import ExercisesShow from './components/Exercises/ExercisesShow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/exercises' element={<ExercisesIndex /> } />
        <Route path='/exercises:id' element={<ExercisesShow /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
