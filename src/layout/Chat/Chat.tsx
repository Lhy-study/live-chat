import ChatInfo from "@/components/ChatInfo/ChatInfo"
import SendMsg from "@/components/SendMsg/SendMsg"
import TopSider from "@/components/TopSider/TopSider"
import main from "./Chat.module.less"
import { useParams } from "react-router"
import { useEffect } from "react"
import PubSub from "pubsub-js"


const Chat = () => {
  const { uid }=useParams()//拿到uid
  useEffect(()=>{
    PubSub.publish("change",true);
    return ()=>{
      PubSub.publish("change",false);
    }
  },[uid])
  console.log(uid);
  return (
    <div className={main.chat}>
      <TopSider />
      <ChatInfo />
      <SendMsg />
    </div>
  )
}
export default Chat