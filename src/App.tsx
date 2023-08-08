import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Heatmap from './Pages/Heatmap'
import Running from './Pages/Running'
import Skiing from './Pages/Skiiing'
import { useState } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'
import Login from './Pages/Login'

function App() {
  const [isLoading, setIsLoading] = useState(false);

  function changeIsLoading(load: boolean){
    load ? setIsLoading(true) : setIsLoading(false); 
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar handleLoading={changeIsLoading}/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/heatmap' element={<Heatmap/>}/>
          <Route path='running' element={<Running/>}/>
          <Route path='skiing' element={<Skiing/>}/>
        </Routes>
      </BrowserRouter>
      <div style={styles.loaderContainer}>
        <MagnifyingGlass
            visible={isLoading}
            height="80"
            width="80"
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