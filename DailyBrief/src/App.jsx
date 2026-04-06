import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import Article from './pages/Article'
import SavedNews from './pages/SavedNews'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast";
import TrendingSection from './component/TrendingSection'

const App = () => {
  return (
    <>
    <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/saved" element={<SavedNews />} />
         <Route path="/trending" element={<TrendingSection/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App