import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './components/home'
import Create from './components/Create';
import Update from './components/Update';
import View from './components/View';
import LoginSignUp from './components/LoginSignUp'
import AdminMain from './components/AdminMain'
import 'normalize.css';
import UserRequest from './components/UserRequest'
import Subscription from './components/Subscription'



function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignUp />}></Route>
        <Route path='/subscription' element={<Subscription />}></Route>
        <Route path='/main/:mail' element={<Home />}></Route>
        <Route path='/create/:mail' element={<Create />}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
        <Route path='/adminMain' element={<AdminMain />}></Route>
        <Route path='/admin/request' element={<UserRequest />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
