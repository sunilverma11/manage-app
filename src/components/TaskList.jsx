import axios from "axios";
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"
import { 
    todoRequestAction,
    todoFailureAction,
    getTodoSuccessAction,
    deleteTodoSuccessAction,
    updateTodoSuccessAction
} from "../redux/action"
import { Button, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import EditModal from "./EditModal";
const ApiUrl = process.env.REACT_APP_API_URL;

const TaskList = (props)=>{
    const dispatch = useDispatch();
    // const tableRef = useRef(null);
    //todos,isLoading,isError,ref from redux store
    const {todos, isLoading} = useSelector((store)=>{
        console.log("stote selector",store)
        return store
    })

    
    const deleteTask= async(id) =>{
        console.log(id)
        try {
            console.log("in request")
            dispatch(todoRequestAction({}))
            await axios.delete(`${ApiUrl}/task/${id}`).then((res)=>{
                console.log("in delete",res.data)
                dispatch(deleteTodoSuccessAction(res.data))
            })
        } 
        catch (error) {
            console.log("in error")
            dispatch(todoFailureAction())
        }
    }
    const updateStatus = async(id,status)=>{
        try {
            console.log("in updt",id,status)
            // dispatch(todoRequestAction({...tableRef}))
            await axios.patch(`${ApiUrl}/task/${id}`,{status:status}).then((res)=>{
                console.log("in status change",res.data.item)
                dispatch(updateTodoSuccessAction(res.data.item))
            })
        } 
        catch (error) {
            console.log("in error")
            // dispatch(todoFailureAction())
        }
    }
    useEffect(()=>{
        console.log("in useeffect for get")
        const getTasks=async()=>{
            try {
                console.log("in request")
                dispatch(todoRequestAction())
                await axios.get(`${ApiUrl}/task/${localStorage.getItem("_id")}`).then((res)=>{
                    console.log("in get")
                    dispatch(getTodoSuccessAction(res.data))
                })
            } 
            catch (error) {
                console.log("in error")
                dispatch(todoFailureAction())
            }
            
        }
        getTasks()
    },[dispatch])
    
    return <div style={{marginTop:'20px'}}>
    {/* <h3>Tasks List</h3> */}
    <Heading noOfLines={1} size="md">Tasks List </Heading>
    {
    isLoading?"Loading":
    <div >
        {todos?.length>0? <TableContainer style={{width:'700px',maxHeight:'350px',overflowY:'auto'}}>
            <Table size='sm'>
                <Thead style={{position:'sticky',top:'0',fontWeight:'bolder',backgroundColor:'lightgray',color:'gray',zIndex:'1'}}>
                <Tr>
                    <Th>Title</Th>
                    <Th>status</Th>
                    <Th>update/delete</Th>
                </Tr>
                </Thead>
                <Tbody>
                {todos?.length>0?todos.map((element)=>
                        <Tr key={element._id}>
                        <Td style={{width:'60%'}}>{element.title}</Td>
                        <Td>{element.status?" ✔️":" ❌"}</Td>
                        <Td>
                            <Stack spacing={4} direction='row' align='center' style={{textAlign:'right'}}>
                            <EditModal 
                                title={element.title}
                                status={element.status}
                                _id={element._id}
                                />
                            <Button onClick={()=>deleteTask(element._id)} colorScheme='red' size='xs'>Delete</Button>
                            <Button colorScheme='teal' size='xs' onClick={()=>updateStatus(element._id,!element.status)}>Done</Button>
                            </Stack>
                        </Td>
                        </Tr>
                    )
                :<Tr><Td>null</Td></Tr>}
                </Tbody>           
            </Table>
        </TableContainer>:<Text>No Data in table Please add</Text>}
    
    </div>}        
    </div>
}
export default TaskList
/*
import axios from "axios"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { 
    todoRequestAction,
    todoFailureAction,
    getTodoSuccessAction,
    deleteTodoSuccessAction
} from "../redux/action"

const TodoList = ()=>{
    const dispatch = useDispatch();
    const {todos,isLoading,isError} = useSelector((store)=>{
        return store
    })
    
    const deleteTodo= async(id) =>{
        console.log(id)
        try {
            console.log("in request")
            dispatch(todoRequestAction())
            await axios.delete("http://localhost:8080/todos/"+id).then((res)=>{
                console.log("in get",res.data)
                dispatch(deleteTodoSuccessAction(res.data))
            })
        } 
        catch (error) {
            console.log("in error")
            dispatch(todoFailureAction())
        }
    }
    useEffect(()=>{
        const getTodos=async()=>{
            try {
                console.log("in request")
                dispatch(todoRequestAction())
                await axios.get("http://localhost:8080/todos").then((res)=>{
                    console.log("in get")
                    dispatch(getTodoSuccessAction(res.data))
                })
            } 
            catch (error) {
                console.log("in error")
                dispatch(todoFailureAction())
            }
            
        }
        getTodos();
    },[dispatch])


    return <div>
    TODO LIST
    {isLoading?"Loading":<div>
    {todos?.length>0?todos.map((el)=>
    <div key={el.id}>
        <p>{el.title}</p><b>{el.status?"done":"incomplete"}</b>
        <button onClick={()=>deleteTodo(el.id)}>delete</button>
    </div>):null}
    </div>}        
    </div>
}

export default TodoList;
*/