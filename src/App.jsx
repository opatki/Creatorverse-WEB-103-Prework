import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AddCreator from './pages/AddCreator'
import ShowCreators from './pages/ShowCreators'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import Layout from './components/Layout'


export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ShowCreators />} />
            <Route path="/add" element={<AddCreator />} />
            <Route path="/edit/:id" element={<EditCreator />} />
            <Route path="/creator/:id" element={<ViewCreator />} />
          </Route>
        </Routes>
      </BrowserRouter>      
    </>
  )
}

