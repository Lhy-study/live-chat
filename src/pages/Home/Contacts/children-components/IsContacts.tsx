import CustomIcon from "@/components/IconFont/CustomIcon"
import UserList from "@/components/UserList/UserList"
import PubSub from "pubsub-js"
import { getMyFriend } from "@/api/friend"
import { useEffect ,useState} from "react"
import { useNavigate } from "react-router"
import { toast , ToastContainer } from "react-toastify"
import { UserInfo } from "@/types/interface"
import { baseUrl } from "@/baseConfig"

interface friendType{
    time:Date,
    user:UserInfo
}


const IsContacts = () => {
    const Navigate= useNavigate()
    const [ friendArr,setFriendArr ] = useState<friendType[]>([])
    const handle = () => { //打开遮罩层
        PubSub.publish("openDialog", true)
    }
    const checkout = ()=>{ //选择是显示联系人
        PubSub.publish("isContacts",false)
    }
    useEffect(() => {
      getMyFriend()
        .then(({data})=>{
            setFriendArr(data.data)
        })
        .catch((e)=>{
            toast.error(`${e.msg}`,{
                position:toast.POSITION.TOP_CENTER
            })
        })
    }, [])
    const routerPush=(uid:number)=>{
        Navigate(`/home/contacts/${uid}`)
    }
    return (
        <div className="contacts contacts-true">
            <header>
                <p>联系人</p>
                <div onClick={handle}>
                    <CustomIcon name="icon-tianjiahaoyou" size="big" />
                </div>
            </header>
            <span onClick={checkout} className="iconfont icon-qiehuan">查看好友请求</span>
            {
                friendArr.length ?
                friendArr.map(item => (
                    <UserList 
                        id={item.user.uid} 
                        name={item.user.username} 
                        imgUrl={baseUrl+item.user.avatar} 
                        key={item.user.uid} onClick={()=>{routerPush(item.user.uid);}}
                    />
                )) :
                <p>您暂时还没有好友</p>
            }
            <ToastContainer
                position='top-center'
                theme="colored"
                autoClose={3000}
            />
        </div>
    )
}
export default IsContacts