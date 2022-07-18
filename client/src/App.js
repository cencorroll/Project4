import './App.css'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExercisesIndex from './components/Exercises/ExercisesIndex';
import ExercisesShow from './components/Exercises/ExercisesShow';
import Register from './components/Auth/Register'
import PageNavBar from './PageNavBar'
import Login from './components/Auth/Login'
import WorkoutIndex from './components/workouts/WorkoutIndex';
import WorkoutShow from './components/workouts/WorkoutShow';
import WorkoutAdd from './components/workouts/WorkoutAdd';
import Profile from './components/Profile';
import Home from './Home';
import NotFound from './components/NotFound';
// import GroupsExercises from './components/Exercises/GroupsExercises';

function App() {

  return (
    <BrowserRouter>
    {/* PageNavBar is above routes so that it can be displayed on each page */}
      <PageNavBar />
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/profile' element={<Profile /> } />
        <Route path='/exercises' element={<ExercisesIndex /> } />
        <Route path='/workouts' element={<WorkoutIndex /> } />
        <Route path='/workouts/add' element={<WorkoutAdd /> } />
        <Route path='/exercises/:id' element={<ExercisesShow /> } />
        <Route path='/workouts/:id' element={<WorkoutShow /> } />
        {/* for improvements */}
        {/* <Route path='/groups/' element={<GroupsExercises /> } />
        <Route path='/groups/:id' element={<GroupsExercises /> } /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
