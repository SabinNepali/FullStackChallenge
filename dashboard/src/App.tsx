import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmitScanResultsForm from './components/SubmitResult';
import Home from './components/Home';
import GridView from './components/DisplayResults';
import Findings from './components/Findings';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/display' element={<GridView/>} ></Route>
        <Route path='/submit' element={<SubmitScanResultsForm/>} ></Route>
        <Route path='/findings' element={<Findings/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>   
  );
}

export default App;
