
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import AllQuestion from './components/QA/AllQuestion';
import Blog from './components/blog/Blog';
import Login from './pages/Login';
import AskQuestion from './components/QA/AskQuestion';
import SingleQuestion from './components/QA/SingleQuestion';

const App = () => {
  return (
    <>
    
    
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/allquestion' element={<AllQuestion/>} />
      <Route path='/askquestion' element={<AskQuestion/>} />
      <Route path='/blogs' element={<Blog/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/singlequestion' element={<SingleQuestion/>} />


      
      </Routes>
      <Footer/>
    </BrowserRouter>

    </>
  )
}

export default App

