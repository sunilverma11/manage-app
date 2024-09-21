import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, useDisclosure } from "@chakra-ui/react"
import axios from "axios";
import { useRef, useState } from "react"
import { useDispatch } from "react-redux";
import { getTodoSuccessAction, todoFailureAction, todoRequestAction} from "../redux/action";
const ApiUrl = process.env.REACT_APP_API_URL

function EditModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const [update, setUpdate] = useState({...props});
  
    const initialRef = useRef(null)
    const getTasks=async()=>{
        try {
            console.log("in request")
            dispatch(todoRequestAction())
            await axios.get(`${ApiUrl}/task/${localStorage.getItem("_id")}`,{headers:{authorization:localStorage.getItem("token")}}).then((res)=>{
                console.log("in get")
                // setTasks(res.data)
                dispatch(getTodoSuccessAction(res.data))
            })
        } 
        catch (error) {
            console.log("in error")
            dispatch(todoFailureAction())
        }
        
    }
    const updateTask = async ()=> {
        console.log("hello edit",update)
        const {title,status} = update;
        try {
            console.log("in updt",status)
            dispatch(todoRequestAction({}))
            await axios.patch(`${ApiUrl}/task/${update._id}`,{status,title},{headers:{authorization:localStorage.getItem("token")}}).then((res)=>{
                console.log("in status change",res.data)
                // dispatch(updateTodoSuccessAction())
                getTasks()
            })
        } 
        catch (error) {
            console.log("in error")
            dispatch(todoFailureAction())
        }
        

    }
    const changeValue = (key,value)=>{
        console.log("val",value,typeof(value))
        if(key==="status") setUpdate({...update,[key]:Number(value)===1?true:false})
        else setUpdate({...update,[key]:value})
    }    
    return (
      <>
        <Button onClick={onOpen} colorScheme='teal' size='xs'>update</Button>  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    {/* <FormLabel htmlFor="title">Title</FormLabel> */}
                    <Text mb='10px' as='b'>Title</Text>
                    <Input id="title" name='title' ref={initialRef} value={update.title} onChange={(e)=>changeValue(e.target.name,e.target.value)} placeholder='First name' />
                </FormControl>
                <FormControl mt="1rem">
                <Text mb='10px' as='b'>Status</Text>              
                <RadioGroup id="status" value={update.status?1:0} onChange={(e)=>changeValue("status",e)}>
                    <Stack direction='row'>
                        <Radio size='md' value={0}>Pending</Radio>
                        <Radio size='md' value={1}>Done</Radio>
                    </Stack>
                </RadioGroup>
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>updateTask()}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default EditModal;