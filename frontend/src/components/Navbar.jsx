import { Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Navbar = ()=>{
    return(
        <Stack style={{position:'fixed',display:'flex',flexDirection:'row',justifyContent:'space-between',
        width:'100%',color:'white',border:'1px solid gray',backgroundColor:'gray',
        padding:'10px 10px',textAlign:'center',zIndex:'1',alignItems:'center'}}>
          <Text style={{fontWeight:'bolder', color:'Blue'}}>Manage App</Text>
          <Text style={{display:'flex', gap:'10px',fontWeight:'bold'}}>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link onClick={()=>{
                localStorage.removeItem("name")
                localStorage.removeItem("_id")
                localStorage.removeItem("token")
                }} to="/login">Logout</Link>
          </Text>
        </Stack>
    )
}
export default Navbar