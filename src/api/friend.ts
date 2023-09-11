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

//获取好友请求
export const getFriReq=()=>{
    return initRequest({
        method:"get",
        url:"/friend/getFriReq",
    })
}

//同意好友请求
export const agreeFriReq=(frId:number)=>{
    return initRequest({
        method:"post",
        url:"/friend/agreeFriReq",
        data:{
            frId
        }
    })
}

//获取好友列表
export const getMyFriend=()=>{
    return initRequest({
        method:"get",
        url:"/friend/getMyFriend",
    })
}
