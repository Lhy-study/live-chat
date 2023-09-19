import { initRequest } from "./request";

//发表朋友圈
export const sendFC= (formData:FormData)=>{
    return initRequest({
        method:"post",
        url:"/fc/addFc",
        data:formData,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}

/**
 * 获取用户的朋友圈数据
 * @param uid 
 * @returns 
 */
export const getUserCOF = (uid:number)=>{
    return initRequest({
        method:"post",
        url:"/fc/getgetUserCOF",
        data:{
            uid
        },
    })
}