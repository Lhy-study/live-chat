import {initRequest} from "./request";

export const login=(obj:{username:string,password:string})=>{
    return initRequest({
        method:"post",
        url:"/user/login",
        data:obj
    })
}

export const reg=(obj:{username:string,password:string})=>{
    return initRequest({
        method:"post",
        url:"/user/register",
        data:obj
    })
}