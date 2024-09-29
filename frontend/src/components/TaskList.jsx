import axios from "axios";
import { useEffect, useState} from "react";
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
    const [titleLength, setTitlelength]= useState(15)
    // const tableRef = useRef(null);

    //todos,isLoading,isError,ref from redux store
    const {todos, isLoading} = useSelector((store)=>{
        // console.log("stote selector",store)
        return store
    })

    
    const deleteTask= async(id) =>{
        try {
            dispatch(todoRequestAction({}))
            await axios.delete(`${ApiUrl}/task/${id}`,{headers:{authorization:localStorage.getItem("token")}}).then((res)=>{
                dispatch(deleteTodoSuccessAction(res.data))
            })
        } 
        catch (error) {
            dispatch(todoFailureAction())
        }
    }
    const updateStatus = async(id,status)=>{
        try {
            // dispatch(todoRequestAction({...tableRef}))
            await axios.patch(`${ApiUrl}/task/${id}`,{status:status},{headers:{authorization:localStorage.getItem("token")}}).then((res)=>{
                dispatch(updateTodoSuccessAction(res.data.item))
            })
        } 
        catch (error) {
            // dispatch(todoFailureAction())
        }
    }
    useEffect(()=>{
        const getTasks=async()=>{
            try {
                let token = localStorage.getItem("token");
                if(token===undefined || token===null || token === "") return;
                dispatch(todoRequestAction())
                await axios.get(`${ApiUrl}/task/${localStorage.getItem("_id")}`,{headers:{authorization:token}}).then((res)=>{
                    dispatch(getTodoSuccessAction(res.data))
                })
            } 
            catch (error) {
                dispatch(todoFailureAction())
            }            
        }
        getTasks()
        setTitlelength(window.innerWidth*3/70)
    },[dispatch])
    
    return <div>
    <Heading noOfLines={1} size="md">Tasks List </Heading>
    { isLoading?"Loading": 
    <>{todos?.length>0? <TableContainer style={{width:'95vw',maxWidth:'800px',maxHeight:'55vh',overflowY:'auto',marginTop:'.5rem'}}>
            <Table size='sm'>
                <Thead style={{fontWeight:'bolder',backgroundColor:'black',zIndex:'1'}}>
                {/* position:'sticky',top:'0', */}
                <Tr>
                    <Th>Title</Th>
                    {/* <Th>status</Th> */}
                    <Th>Update / Delete / Status</Th>
                </Tr>
                </Thead>
                <Tbody>
                {todos?.length>0?todos.map((element)=>
                        <Tr key={element._id}>
                        <Td style={{width:'80%',wordBreak:'break-all'}}>{element.title.length>titleLength?element.title.slice(0, titleLength)+"...":element.title}</Td>
                        {/* <Td>{element.status?" ✔️":" ❌"}</Td> */}
                        <Td>
                            <Stack spacing={4} direction='row' align='center' style={{textAlign:'right'}}>
                            <EditModal 
                                title={element.title}
                                status={element.status}
                                _id={element._id}
                                />
                            <Button onClick={()=>deleteTask(element._id)} colorScheme='red' size='xs'>Delete</Button>
                            <Button colorScheme='teal' size='xs' onClick={()=>updateStatus(element._id,!element.status)}>{element.status?" ✔️":" ❌"}</Button>
                            </Stack>
                        </Td>
                        </Tr>
                    )
                :<Tr><Td>null</Td></Tr>}
                </Tbody>           
            </Table>
        </TableContainer>:<Text>No Data in table Please add</Text>}    
    </>}        
    </div>
}
export default TaskList;