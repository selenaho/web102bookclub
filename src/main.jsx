import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ViewPosts from './pages/ViewPosts.jsx'
import DetailedPostView from './pages/DetailedPostView.jsx'
import Edit from './pages/Edit.jsx'
import Create from './pages/Create.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} element={<ViewPosts />} />
        </Route>
        <Route path="/view/:id" element={<DetailedPostView/>} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/new" element={<Create/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
