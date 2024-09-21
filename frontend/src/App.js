import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import LogoIcon from './components/logo';
import Navbar from './components/Navbar';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
import { ChakraProvider } from '@chakra-ui/react'
import ProtectedRoute from './ProtectedRoute';
import Tasks from './components/Tasks';
import Contact from './components/Contact';
import About from './components/About';
function App() {
  return (
    <ChakraProvider>
      <Router>
      <div>
        <LogoIcon/>
        <Navbar/>           
      </div>
      <div style={{color:"white",position:'absolute',display:'flex',flexDirection:'column',
        justifyContent:'space-evenly',width:'100%',alignItems:'center',top:'80px'}}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard"/>}></Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contact/" element={<Contact/>}/>
          <Route path="/about/" element={<About/>}/>
          <Route  path="/dashboard" element={<ProtectedRoute><Tasks/></ProtectedRoute>}/>
        </Routes>
      </div>
      </Router>      
      {/* <div style={{color:'white',position:'absolute',display:'flex',flexDirection:'column',justifyContent:'space-evenly',width:'100%',alignItems:'center',top:'80px'}}>
      <Register/>
      <Login/>
      <Tasks/>
      </div>       */}
      </ChakraProvider>
  );
}

export default App;
