import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(()=>{
        console.log("in ls value",localStorage.getItem("name"))
        setIsAuthenticated(localStorage.getItem("name")?true:false)
    },[])

    return isAuthenticated?children:<Navigate to="/login"/>;
}
export default ProtectedRoute;