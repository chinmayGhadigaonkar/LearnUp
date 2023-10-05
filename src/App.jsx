
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
import AIChatPage from './components/ai/AIChatPage';
import ContactUS from './pages/ContactUS';
import BlogPost from './components/blog/BlogPost';

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
      <Route path='/aichats' element={<AIChatPage/>} />
      <Route path='/contactus' element={<ContactUS/>} />
      <Route path='/BlogPost' element={<BlogPost/>} />



      
      </Routes>
      <Footer/>
    </BrowserRouter>

    </>
  )
}

export default App

