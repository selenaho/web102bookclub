import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
        <Header/>
        <div className='App'>
            <h1>Welcome to the Book Club!</h1>
            <Outlet></Outlet>
        </div>
    </>
    
  )
}

export default App;
