import "./SendMsg.less"
import { memo, useContext ,useEffect , useState} from "react"
import IconFont from "@/components/IconFont/CustomIcon"
import { UserInfoContext , UserInfoContextType} from "@/Context/userContext"
import { useForm } from "react-hook-form"
import { io } from "socket.io-client"
import { baseUrl } from "@/baseConfig"
import { chat_info_type } from "@/types/interface"
import { publish } from "pubsub-js"
import { sendChatInfo } from "@/api/chat"
interface FormProp{
  text:string
}

interface prop{
  convId:number
}

const SendMsg = memo<prop>(({convId}) => {
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const [socket,setSocket] = useState(io(baseUrl))
  const { register, handleSubmit , reset} = useForm<FormProp>({
    mode: "all",
    reValidateMode: "onChange",
  })
  useEffect(()=>{
    //出现多次是这里的问题
    socket.emit("joinSession",convId);
    socket.on("message",(message)=>{
      console.log(11);
      publish("message",message)
    })
    console.log('测试');
    
  },[convId,socket])
  //点击提交按钮
  const submit=({ text }:FormProp)=>{
    socket.emit("chatMsg",convId,{
      convId,
      senderId:userInfo?.uid,
      content:text,
      contentType:chat_info_type.TEXT
    });
    sendChatInfo(convId,(userInfo?.uid) as number,text,chat_info_type.TEXT)
      .then(({data})=>{
        console.log(data.data);
      })
      .catch((e)=>{
        console.log(e);
      })
      reset()
  }
  return (
    <form className="sendMsg" onSubmit={handleSubmit(submit)}>
      <div className="widgets">
        <IconFont name="icon-biaoqing1"/>
        <IconFont name="icon-tupian"/>
      </div>
      <textarea  {...register('text')} rows={3} placeholder="输入的长度不可超过200" autoComplete="off" />
      <button className="send" type="submit">
        <IconFont name="icon-fasong"/>
      </button>
    </form>
  )
})
export default SendMsg