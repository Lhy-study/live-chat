import ChatInfo from "@/components/ChatInfo/ChatInfo"
import SendMsg from "@/components/SendMsg/SendMsg"
import TopSider from "@/components/TopSider/TopSider"
import main from "./Chat.module.less"
import { useParams } from "react-router"
import { useEffect , memo} from "react"
import PubSub from "pubsub-js"


const Chat = memo(() => {
  const { uid }=useParams()//拿到uid
  useEffect(()=>{
    PubSub.publish("EmptyShow",true);
    return ()=>{
      PubSub.publish("EmptyShow",false);
    }
  },[uid])
  // console.log(uid);
  return (
    <div className={main.chat}>
      <TopSider />
      <ChatInfo />
      <SendMsg />
    </div>
  )
})
export default Chat