export enum Gender {
    'female' = 1,
    'male' = 2,
    'unknown' = 3
}

export enum chat_info_type{
    TEXT,
    IMG
}

export interface UserInfo {
    uid: number
    username: string
    avatar: string
    gender: Gender
    signature?: string
}

//每条会话
export interface converSationInfo{
    convId:number
    createTime:string
    isGroup:boolean
}

//每条信息
export interface ChatMsgInfo{
    chatInfoId:number
    content:string
    contentType:chat_info_type
    sendTime:string
    covId:number
    senderInfo:UserInfo
}

