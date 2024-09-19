import { 
    TODO_REQUEST,
    TODO_FAILURE,
    GET_TODO_SUCCESS,
    POST_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS
} from "./actionType";

export const todoRequestAction =()=>{
    return{type:TODO_REQUEST}
}

export const todoFailureAction =()=>{
    return{type:TODO_FAILURE}
}

export const getTodoSuccessAction =(payload)=>{
    return{type:GET_TODO_SUCCESS,payload}
}

export const postTodoSuccessAction =(payload)=>{
    return{type:POST_TODO_SUCCESS,payload}
}

export const updateTodoSuccessAction =(payload)=>{
    return{type:UPDATE_TODO_SUCCESS,payload}
}

export const deleteTodoSuccessAction =(payload)=>{
    return{type:DELETE_TODO_SUCCESS,payload}
}