import { initRequest } from "./request";

//发送请求
export const sendFriReq=(targetId:number)=>{
    return initRequest({
        method:"post",
        url:"/friend/sendFriReq",
        data:{
            targetId
        }
    })
}

//获取请求
export const getFriReq=()=>{
    return initRequest({
        method:"get",
        url:"/friend/getFriReq",
    })
}

//发送请求
export const agreeFriReq=(frId:number)=>{
    return initRequest({
        method:"post",
        url:"/friend/agreeFriReq",
        data:{
            frId
        }
    })
}
