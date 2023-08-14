import request from "../axios";

interface configType{
    url:string
    method:string,
    data?:unknown,
    params?:unknown
}

//做一个初始化axios封装(不包括防止重复提交和缓存数据)
const initRequest=(config:configType)=>{
    return request({...config})
}

//已经完成还在请求中禁止重复发起请求
const myRequest=(()=>{
    let urlArr:Array<string>=[];
    return (config:configType)=>{
        const {url}=config;
        if(urlArr.includes(url)){
            return Promise.reject("已经在请求了，请勿频繁发送")
        }
        urlArr.push(url);
        request({...config}).then(()=>{
            urlArr=urlArr.filter((item)=>{
                return item!=url
            })
        })
    }
})()

export default {
    initRequest,
    requeset:myRequest
}

