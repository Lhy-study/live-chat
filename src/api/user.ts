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

export const isLogin=()=>{
    return initRequest({
        method:"get",
        url:"user/islogin"
    })
}

export const findUser=(username:string)=>{
    return initRequest({
        method:"post",
        url:"user/search",
        data:{
            username
        }
    })
}

export const getUserInfo=(uid:number)=>{
    return initRequest({
        method:"post",
        url:"/user/getUserInfo",
        data:{
            uid
        }
    })
}

export const updateInfo=(uid:number,value:{username:string,gender:string,signature:string})=>{
    return initRequest({
        method:"post",
        url:`/user/update`,
        data:{
            uid,
            value
        }
    })
}

export const updateAvatar=(formData:FormData)=>{
    return initRequest({
        method:"post",
        url:`/user/update/avatar`,
        // data:{
        //     uid,
        //     formData
        // }
        data:formData,
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updatePassword=(
    uid:number,
    password:string,
    newPsw:string
)=>{
    return initRequest({
        method:"post",
        url:"/user/update/password",
        data:{
            uid,
            password,
            newPsw
        }
    })
}