import "./TopSider.less"
import CustomIcon from "../../components/IconFont/CustomIcon"
import { memo , useEffect , useState , useContext} from "react"
import { useParams } from "react-router"
import { getConversationChatInfo } from "@/api/conversation" 
import { UserInfo } from "@/types/interface"
import { UserInfoContext , type UserInfoContextType} from "@/Context/userContext"

interface TopSiderData{
  convId:number
  isGroup:boolean,
  Users:UserInfo[]
}

const TopSider = memo(() => {
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType 
  const [ topSiderData , setData ] = useState<TopSiderData>()
  const [ friend,setFriend ] = useState<{uid:number,username:string}>()
  const { convId } = useParams()
  const forback=()=>{
    history.go(-1)
  }
  useEffect(()=>{
    getConversationChatInfo(parseInt(convId!))
      .then(({data:{data}})=>{
        // console.log(data);
        setData({
          convId : data.convId,
          isGroup:data.isGroup,
          Users:data.Users
        })
      })
      .catch((e)=>{
        console.log(e.msg);
      })
  },[convId])
  useEffect(()=>{
    topSiderData?.Users.forEach((item)=>{
      if(item.uid!=userInfo?.uid){
        setFriend({
          uid:item.uid,
          username:item.username
        })
      }
    })
  },[topSiderData, userInfo?.uid])
  return (
    <div className="topSider">
      <div className="fc" onClick={forback}>
        <CustomIcon name="icon-yiliaohangyedeICON-" size="big"/>
      </div>
      <p>{ friend?.username }</p>
      <div className="fc">
        <CustomIcon name="icon-gengduo" size="big"/>
      </div>
    </div>
  )
})
export default TopSider