import { Heading } from "@chakra-ui/react";
import "../style/Task.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { isAuthAction } from "../redux/action";
import heartgif from "../utils/heartgif.gif"
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteExpenditureSuccessAction, getExpenditureSuccessAction, postExpenditureSuccessAction, todoFailureAction, todoRequestAction } from "../redux/action";
const ApiUrl = process.env.REACT_APP_API_URL
const Expenditures = ()=>{
    const dispatch = useDispatch();
    const [value, setValue] = useState({})
    const [totalExpend, setTotalExpend] = useState(0)
    const {expenditures} = useSelector((store)=>{
        // console.log("stote selector",store)
        return store        
    })
    const postExpenditure = async (e)=>{
        e.preventDefault();
        console.log("valll",value)
        try {
            dispatch(todoRequestAction())
            await axios.post(`${ApiUrl}/expenditure`,
                {...value,userid:localStorage.getItem("_id")},
                {headers:{authorization:localStorage.getItem("token")}})
                .then((res)=>{
                dispatch(postExpenditureSuccessAction(res.data))
                setValue([])
            })
        }
        catch (error) {
            dispatch(todoFailureAction())
        }
    }
    const deleteExpenditure = async (_id)=>{
        try {
            dispatch(todoRequestAction())
            await axios.delete(`${ApiUrl}/expenditure/${_id}`,
                {headers:{authorization:localStorage.getItem("token")}})
                .then((res)=>{
                dispatch(deleteExpenditureSuccessAction({_id}))
            })
        }
        catch (error) {
            dispatch(todoFailureAction())
        }
    }  
    useEffect(()=>{
        const getTasks=async()=>{
            try {
                let token = localStorage.getItem("token");
                if(token===undefined || token===null || token === "") return;
                dispatch(todoRequestAction())
                await axios.get(`${ApiUrl}/expenditure/${localStorage.getItem("_id")}`,{headers:{authorization:token}}).then((res)=>{
                    dispatch(getExpenditureSuccessAction(res.data))
                    console.log("exp res", res.data)
                })
            } 
            catch (error) {
                dispatch(todoFailureAction())
            }            
        }
        
        getTasks()
    },[dispatch])
    useEffect(()=>{
        let sum = 0;
        for(let i=0; i<expenditures.length; i++) sum= sum+ Number(expenditures[i].amount)
        console.log("acccu",expenditures)
        setTotalExpend(sum)
    },[expenditures])
    return(
        <div className="task-container">
            <Link to="../dashboard/tasks" style={{"alignContent":'end'}}>Go to manage tasks...</Link>
            <Heading style={{display:'flex'}} noOfLines={1} size="md">Hey, {localStorage.getItem("name")}! <img alt="heart" width={"30px"} src={heartgif}/> Welcome here😊</Heading>
            <div style={{display:'grid'}}> 
            {/* <TaskList/> */}
            <h2>Manage Expenditures</h2>
            <form action="" onSubmit={postExpenditure} style={{padding:'10px 20px'}} >
                <input 
                    required={true}
                    type="text"
                    name="reference"
                    placeholder="Reference name"
                    style={{margin:'10px',padding:'5px',color:'black'}}
                    value={value?.reference?value.reference:""} onChange={(el)=>{
                    setValue({...value,[el.target.name]:el.target.value});
                }}/>
                <input 
                    required={true}
                    name="amount"
                    placeholder="amount"
                    type="number"
                    style={{margin:'10px',padding:'5px',color:'black', backgroundColor:'pink'}}
                    value={value?.amount?value.amount:""} onChange={(el)=>{
                        setValue({...value,[el.target.name]:el.target.value});
                }}/>
                <input type="submit" style={{backgroundColor:'green', margin:'10px',padding:'5px 8px'}}  value="Add"/>
            </form>  
            </div>
            <div>
                {expenditures.map((el)=>{
                    return(
                        <div key={el._id} style={{display:"flex", gap:'10px'}}>
                            <h2 ><b>Ref: {el.reference}, Amount: {el.amount} </b></h2><button onClick={()=>deleteExpenditure(el._id)}> Delete</button>
                        </div>
                    )
                })}
            </div>
            <h3>Total: {totalExpend}</h3>
        </div>
    )
}
export default Expenditures;