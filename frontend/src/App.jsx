import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import GridDisplay from "./components/GridDisplay";

function App() {
  return (
    <div className='
      min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950
    '>
      <Navbar />
      <Header />
      <GridDisplay />
    </div>
  )
}

export default App;