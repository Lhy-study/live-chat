import "./UserInfoShow.less"
import PubSub from "pubsub-js"
import { useEffect, useState } from "react"
import { useParams ,useNavigate} from "react-router-dom"
import { startChat } from "@/api/conversation"
import { getUserInfo } from "@/api/user"
import { UserInfo } from "@/types/interface"
// import CustomImage from "@/components/CustomImage/CustomImage"
import { baseUrl } from "@/baseConfig"
const UserInfoShow = () => {
    const { uid }=useParams();
    const Navigate = useNavigate();
    const [ userInfo,setUserInfo ] = useState<UserInfo>()
    const goChat=()=>{
        startChat(parseInt(uid!))
            .then(({data})=>{
                Navigate(`/home/conversation/${data.data[0].convId}`)
            })
            .catch((e)=>{
                console.log(e);
            })
    }
    useEffect(()=>{
        PubSub.publish("EmptyShow",true)
        return ()=>{
            PubSub.publish("EmptyShow",false)
        }
    })
    useEffect(()=>{
        getUserInfo(parseInt(uid!))
            .then(({data})=>{
                // console.log(data.data);
                setUserInfo(data.data)            
            })
            .catch((e)=>{
                console.log(e);
            })
    },[])
  return (
    <div className="userInfoShow">
        <div className="userInfoShow-main">
            <div className="info">
                <img 
                    src={baseUrl + userInfo?.avatar} 
                />
                <div className="text">
                    <p>{userInfo?.username}</p>
                    <p>个性签名：{userInfo?.signature ? userInfo.signature : '暂时还没有哦~'}</p>
                </div>
            </div>
            <span onClick={goChat}>发消息</span>
        </div>
    </div>
  )
}
export default UserInfoShow