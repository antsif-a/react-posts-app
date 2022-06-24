import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './ui/navbar/Navbar';
import AppRouter from './AppRouter';
import '../styles/app.scss';

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
