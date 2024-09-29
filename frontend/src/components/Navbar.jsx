import { Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const Navbar = ()=>{
  const [statusTab, setStatusTab] = useState();
  const {isAuth} = useSelector((store)=>{
    // console.log("stote selector",store)
    return store
  })
  const handleLogout =()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("_id")
    localStorage.removeItem("token")
    setStatusTab(localStorage.getItem("token"))
    window.alert("Logout Successfully")
  }
  useEffect(()=>{
    setStatusTab(localStorage.getItem("token"))
  },[isAuth])

    return(
        <Stack style={{position:'fixed',display:'flex',flexDirection:'row',justifyContent:'space-between',
        width:'100%',color:'white',border:'1px solid gray',backgroundColor:'gray',
        padding:'10px 10px',textAlign:'center',zIndex:'1',alignItems:'center'}}>
          <Text style={{fontWeight:'bolder', color:'lightgreen'}}>Manage App</Text>
          <Text style={{display:'flex', gap:'.45rem',fontWeight:'bold'}}>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          {!statusTab?<><Link to="/login">Login</Link>
          <Link to="/register">Register</Link></>:
          <><Link to="/dashboard">Dashboard</Link>
          <Link onClick={handleLogout} to="/login">Logout</Link></>}
          </Text>
        </Stack>
    )
}
export default Navbar