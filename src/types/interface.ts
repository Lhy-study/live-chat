export enum Gender {
    'female' = 1,
    'male' = 2,
    'unknown' = 3
}

export enum chat_info_type{
    TEXT,
    IMG,
    VEDIO, //视频
    OTHERFILE, //文件
    VOICE, //语音
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

export interface ChatMsgContent{
    contentType: chat_info_type
    content:string
}

