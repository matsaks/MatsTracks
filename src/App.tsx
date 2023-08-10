import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Heatmap from './Pages/Heatmap'
import Running from './Pages/Running'
import Skiing from './Pages/Skiiing'
import { useEffect, useState } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'
import Login from './Pages/Login'
import Footer from './Components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [largeWindow, setLargeWindow] = useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  function changeIsLoading(load: boolean){
    load ? setIsLoading(true) : setIsLoading(false); 
  }

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

const handleResize = () => {
    setLargeWindow(window.innerWidth > 750);
    setWindowSize(window.innerWidth);
    //console.log(windowSize);
};

  return (
    <div>
      <BrowserRouter>
        <Navbar handleLoading={changeIsLoading} largeWindow={largeWindow}/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/heatmap' element={<Heatmap windowSize={windowSize}/>}/>
          <Route path='running' element={<Running windowSize={windowSize}/>}/>
          <Route path='skiing' element={<Skiing windowSize={windowSize}/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>

      <div style={styles.loaderContainer}>
        <MagnifyingGlass
            visible={isLoading}
            height="40"
            width="40"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#e15b64'
            />   
      </div>
    </div>
  )
}

export default App

const styles = {
  loaderContainer: {
      Position: 'fixed',
      left: 0,
      bottom: 0,
      marginLeft: '1px',
      marginBottom: '1px',
      marginTop: '50px'
  }
}