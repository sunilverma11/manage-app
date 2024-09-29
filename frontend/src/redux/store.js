import { legacy_createStore } from "redux";
import { reducer } from "./reducer";
const init={
    todos:[],
    ref:{},
    isLoading:false,
    isError:false,
    isAuth:false
}
export const store= legacy_createStore(reducer, init);