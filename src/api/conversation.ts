import { initRequest } from "./request"

//从好友信息界面进入的 （在是好友的情况下看是不是已经有会话了)
export const startChat=(friendId:number)=>{
    return initRequest({
        method:"post",
        url:"/conversation/startChat",
        data:{
            friendId
        }
    })
}

//获取自己参与的会话
export const getConversation=()=>{
    return initRequest({
        method:"get",
        url:"/conversation/getConverIdList"
    })
}