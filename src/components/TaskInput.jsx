import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { 
    todoRequestAction,
    todoFailureAction, 
    postTodoSuccessAction
} from "../redux/action";
import { Heading } from "@chakra-ui/react";
const ApiUrl = process.env.REACT_APP_API_URL


const TaskInput = ()=>{
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const postTodo=async(e)=>{
        e.preventDefault();
        console.log(value)
        try {
            console.log("in request post")
            dispatch(todoRequestAction())
            await axios.post(`${ApiUrl}/task`,
                {title:value,status:false,userid:localStorage.getItem("_id")},
                {headers:{authorization:localStorage.getItem("token")}})
                .then((res)=>{
                console.log("in post",res.data)
                dispatch(postTodoSuccessAction(res.data))
                setValue("")
            })
        }
        catch (error) {
            console.log("in error")
            dispatch(todoFailureAction())
        }
        
    };

    return(
        <div style={{margin:'1rem auto',maxWidth:'350px',textAlign:'center',color:'white'}}>
                    <Heading noOfLines={1} size="md" style={{textAlign:'center'}}>Task Input</Heading>
        <form action="" onSubmit={postTodo} style={{padding:'10px 20px'}} >
        <input 
            required={true}
            style={{margin:'10px',padding:'5px',backgroundColor:'teal'}}
            value={value} onChange={(el)=>{
            setValue(el.target.value);
        }}/>
        <input type="submit" style={{backgroundColor:'teal', margin:'10px',padding:'5px'}}  value="Add Task"/>
        </form>        
        </div>
    )
}
export default TaskInput;