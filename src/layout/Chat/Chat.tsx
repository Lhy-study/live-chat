import ChatInfo from "@/components/ChatInfo/ChatInfo"
import SendMsg from "@/components/SendMsg/SendMsg"
import TopSider from "@/layout/TopSider/TopSider"
import { baseUrl } from "@/baseConfig"
import main from "./Chat.module.less"
import { useParams } from "react-router"
import { useEffect , memo } from "react"
import PubSub from "pubsub-js"
import { io } from "socket.io-client"
const Chat = memo(() => {
  const { convId }=useParams()//拿到uid
  // const [socket , setSocket] = useState(io(baseUrl))
  const socket=io(baseUrl);
  // const messageListener =(message:string)=>{
  //   console.log(message);
  // }
  // if(convId){
  //   socket.emit("joinSession",convId)
  // }
  // socket.on('message', messageListener);
  useEffect(()=>{
    PubSub.publish("EmptyShow",true);
    // if(convId){
    //   socket.emit("joinSession",convId)
    // }
    // socket.on('message', messageListener);
    return ()=>{
      PubSub.publish("EmptyShow",false);
      // socket.off("message", messageListener); // 在组件卸载时取消监听器
    }
  },[convId, socket])
  // console.log(uid);

  // if(convId){
  //   socket.emit("joinSession",convId)
  // }
  // useEffect(()=>{
  //   socket.on('message', (message) => {
  //     console.log(message);
  //   });
  //   return () => {
  //     // 在组件卸载时清除事件监听器
  //     socket.off('message');
  //     socket.disconnect();
  //   };
  // },[socket])
  return (
    <div className={main.chat}>
      <TopSider />
        <ChatInfo/>
        <SendMsg convId={parseInt(convId!)}/>
    </div>
  )
})
export default Chat;