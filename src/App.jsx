
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import RecentWork from './components/RecentWork/RecentWork';
import GetInTouch from './components/GetInTouch/GetInTouch';

function App() {
  

  return (
    <>
      <Router>  
        <div> 
        <Navbar />  
        </div>                     
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path= 'Recent_work' element={<RecentWork/>} />
          <Route path= 'Get_In_Touch' element={<GetInTouch/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
