import { 
    IS_AUTH,
    TODO_REQUEST,
    TODO_FAILURE,
    GET_TODO_SUCCESS,
    POST_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    GET_EXPENDITURE_SUCCESS,
    POST_EXPENDITURE_SUCCESS,
    DELETE_EXPENDITURE_SUCCESS
} from "./actionType";


//type and payload destructuring from action
export const reducer =(state,{type, payload})=>{
    switch(type){
        case IS_AUTH:
            return {...state, isAuth:payload}
        case TODO_REQUEST:
            return {...state,isLoading:true};
        case TODO_FAILURE:
            return {...state, isLoading:false, isError:true}
        case GET_EXPENDITURE_SUCCESS:
            return {...state, isLoading:false, expenditures:payload};
        case POST_EXPENDITURE_SUCCESS:
            return {...state, isLoading:false, expenditures:[...state.expenditures,payload]};
        case DELETE_EXPENDITURE_SUCCESS:
            console.log("in delete ",payload)
            return {...state, isLoading:false, expenditures: state.expenditures.filter((el)=>el._id!==payload._id)};
        case GET_TODO_SUCCESS:
            return {...state, isLoading:false, todos:payload};
        case POST_TODO_SUCCESS:
            return {...state, isLoading:false, todos:[...state.todos,payload]};
        case UPDATE_TODO_SUCCESS:
            const updateFilter= state.todos.map((el)=>el._id===payload._id?payload:el)
            return {...state, isLoading:false, todos: updateFilter};
        case DELETE_TODO_SUCCESS:
            return {...state, isLoading:false, todos: state.todos.filter((el)=>el._id!==payload._id)};
        default:
            return state;
    }

}