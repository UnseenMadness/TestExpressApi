import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import './App.css';

const Main = () => (
  <React.Fragment>
    <Navbar />
    <Outlet />
  </React.Fragment>
);

export default Main;
