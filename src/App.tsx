import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/ui/navbar/Navbar';
import Posts from './routes/Posts';
import Post from './routes/Post';
import About from './routes/About';
import './styles/main.scss';

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <div className="app">
                <Routes>
                    <Route path="posts" element={<Posts/>} />
                    <Route path="posts/:id" element={<Post/>}/>
                    <Route path="about" element={<About/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
