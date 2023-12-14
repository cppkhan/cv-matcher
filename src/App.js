// src/App.js
import React from 'react';
import FileUpload from './Components/FileUpload';
import './App.css'
const App = () => {
  return (
    <div className="App ">
      <h1 className='Header-color'>CV Matcher</h1>
      <FileUpload />
    </div>
  );
};

export default App;
