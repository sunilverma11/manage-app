import { Heading } from "@chakra-ui/react";
import TaskInput from "./TaskInput"
import TaskList from "./TaskList"
import "../style/Task.css"

const Tasks = ()=>{
    
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