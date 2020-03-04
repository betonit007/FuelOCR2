import React from 'react';
import './App.css';

const App = () => {
  async function backendTest() {
    const res = await fetch('/api/readings/');
    const data = await res.json();
    console.log(data);
  }
  backendTest();
  return <div className="App">App</div>;
};

export default App;
