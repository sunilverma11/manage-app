import { Heading } from "@chakra-ui/react";
import TaskInput from "./TaskInput"
import TaskList from "./TaskList"
import "../style/Task.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isAuthAction } from "../redux/action";

const Tasks = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(isAuthAction(localStorage.getItem("token")))
    })
    return(
        <div className="task-container">
            <Heading noOfLines={1} size="md">Hey, {localStorage.getItem("name")}! Welcome here😊</Heading>
            <div style={{display:'grid'}}>            
            <TaskInput/>
            <TaskList/>
            </div>
        </div> 
    )
}
export default Tasks;