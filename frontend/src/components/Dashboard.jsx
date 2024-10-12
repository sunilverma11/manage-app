import { Heading } from "@chakra-ui/react";
import "../style/Task.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isAuthAction } from "../redux/action";
import heartgif from "../utils/heartgif.gif"
import { Link } from "react-router-dom";
const Dashboard = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(isAuthAction(localStorage.getItem("token")))
    })
    return(
        <div className="task-container">
            <Heading style={{display:'flex'}} noOfLines={1} size="md">Hey, {localStorage.getItem("name")}! <img alt="heart" width={"30px"} src={heartgif}/> Welcome here😊</Heading>
            <div style={{display:'grid'}}>
            <Link to="./tasks"><li>Manage Your Task</li></Link>
            <Link to="./expenditures"><li>Manage Your Expenditures</li></Link>
            </div>
        </div>
    )
}
export default Dashboard;