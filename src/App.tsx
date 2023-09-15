import * as React from 'react';

import './style.css';
import Navbar from './Component/Navbar';
import About from './Component/About';
import Pokedex from './Component/Pokedex';

export default function App() {
  return (
    <>
      <Navbar title="pokedex" className="container" />
      {/* <About/> */}
      
     
      <Pokedex/>
    </>
  );
}
