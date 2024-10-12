import { 
    TODO_REQUEST,
    TODO_FAILURE,
    IS_AUTH,
    GET_TODO_SUCCESS,
    POST_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    GET_EXPENDITURE_SUCCESS,
    POST_EXPENDITURE_SUCCESS,
    DELETE_EXPENDITURE_SUCCESS
} from "./actionType";

export const isAuthAction =(payload)=>{
    return {type:IS_AUTH, payload}
}
export const todoRequestAction =()=>{
    return{type:TODO_REQUEST}
}

export const todoFailureAction =()=>{
    return{type:TODO_FAILURE}
}

export const getExpenditureSuccessAction =(payload)=>{
    return{type:GET_EXPENDITURE_SUCCESS,payload}
}

export const postExpenditureSuccessAction =(payload)=>{
    return{type:POST_EXPENDITURE_SUCCESS,payload}
}

export const deleteExpenditureSuccessAction =(payload)=>{
    return{type:DELETE_EXPENDITURE_SUCCESS,payload}
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