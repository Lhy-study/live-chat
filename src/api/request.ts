import request from "../axios";
import { LRUCache } from "lru-cache"

interface configType{
    url:string
    method:string,
    data?:unknown,
    params?:unknown
}

//做一个初始化axios封装(不包括防止重复提交和缓存数据)
export const initRequest=(config:configType)=>{
    return request({...config})
}

//已经完成还在请求中禁止重复发起请求 缓存数据
export const myRequest =(()=>{
    let urlArr:Array<string>=[];
    const cache=new LRUCache({
        // maxSize:100,//最大有效数
        max:100,
        ttl:3 * 60 * 1000//有效时间
    })

    return async (config:configType)=>{
        const {url}=config;
        if(cache.get(url)){//代表有已经缓存了
            return Promise.resolve(cache.get(url))
        }

        if(urlArr.includes(url)){
            return Promise.reject("已经在请求了，请勿频繁发送")
        }
        urlArr.push(url);
        const res = await request({ ...config });
        cache.set(url, res);
        urlArr = urlArr.filter((item) => {
            return item != url;
        });
        return await Promise.resolve(res);
    }
})()


