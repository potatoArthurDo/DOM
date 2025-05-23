import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import Profile from "./pages/Profile";
import ProtectedRoute from './components/ProtectedRoute';
import Search from './pages/Search';
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogOut() {
  localStorage.clear();
  return <Register />;
}


function App() {

  return (
   <BrowserRouter>
        <Routes>
            <Route path="/"   element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/search' element = {
            <ProtectedRoute>
                <Search />
            </ProtectedRoute>
          }>

          </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogOut />} />
        </Routes>
   </BrowserRouter>
  )
}

export default App
