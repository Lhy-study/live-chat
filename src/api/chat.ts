import { chat_info_type } from "@/types/interface"
import { initRequest } from "./request"

export const getChatInfoList=(convId:number)=>{
    return initRequest({
        method:"post",
        url:"/chat/getChatInfoList",
        data:{
            convId
        }
    })
}

export const sendChatInfo=(
        convId:number,
        senderId:number,
        content:string,
        contentType:chat_info_type
    )=>{
    return initRequest({
        method:"post",
        url:"/chat/sendChatInfo",
        data:{
            convId,
            senderId,
            content,
            contentType
        }
    })
}