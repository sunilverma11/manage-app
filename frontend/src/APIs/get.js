import axios from "axios"
// import { useDispatch } from "react-redux"
// import { getTodoSuccessAction, todoFailureAction, todoRequestAction } from "../redux/action";
const ApiUrl = process.env.REACT_APP_API_URL;


const getTasks=async()=>{
    // const dispatch = useDispatch();
    try {
        console.log("in request")
        // dispatch(todoRequestAction())
        let data = await axios.get(`${ApiUrl}/task/${localStorage.getItem("_id")}`)
        console.log("in get api",[...data.data])
        return [...data.data]
    } 
    catch (error) {
        console.log("in error")
        return[]
        // dispatch(todoFailureAction())
    }
    
}