import { UserInfo } from "./interface"
export interface COFDataType{
    cirFriId:number,
    text:string,
    userId:number,
    time:string,
    userInfo:UserInfo
    other:{
        otherId:number,
        otherType:'IMG'|"VEDIO"|"OTHERFILE",
        otherValue:string|string[]
    },
}