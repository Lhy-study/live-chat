import axios from "axios";
import { baseUrl as baseURL} from "./baseConfig"

const request=axios.create({
    baseURL,
    withCredentials:true,
    timeout:30*1000
})

//响应拦截
request.interceptors.request.use(config=>{
    const token=localStorage.getItem("live-chat");
    if(token){
        config.headers.Authorization=token
    }
    return config
})

//响应拦截
request.interceptors.response.use(res=>{
    const data=res.data
    if(data.code !=200 && data.code!=201){
        return Promise.reject(data)
    }    
    return Promise.resolve(res)
})

export default request