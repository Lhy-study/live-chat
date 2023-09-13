import "./ChatInfo.less"
import { useParams } from "react-router"
import { memo, useEffect, useState, useContext ,useRef} from "react"
import { type ChatMsgInfo } from "@/types/interface"
import { getChatInfoList } from "@/api/chat"
import { UserInfoContext, type UserInfoContextType } from "@/Context/userContext"
import { subscribe , unsubscribe} from "pubsub-js"
import clsx from "clsx"
import CustomImage from "../CustomImage/CustomImage"
import { baseUrl } from "@/baseConfig"

// interface messageType {
//   convId: number
//   senderId: number
//   content: string
//   contentType: chat_info_type
// }

const ChatInfo = memo(() => {
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const [chatInfoList, setChatInfoList] = useState<ChatMsgInfo[]>([])
  const { convId } = useParams()
  const divRef=useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    getChatInfoList(parseInt(convId!))
      .then(({ data: { data } }) => {
        // console.log(data);
        setChatInfoList([...data])
      })
      .catch((e) => {
        console.log(e.msg);
      })
  }, [convId])
  useEffect(() => {
    const subScribeFun = (_: string, data: ChatMsgInfo) => {
      //这里做实时聊天时socket.io放回来的
      
      if(data){
        setChatInfoList([...chatInfoList , data])
      }
    }
    subscribe("message", subScribeFun)
    return ()=>{
      unsubscribe("message")
    }
  }, [ chatInfoList])
  useEffect(() => {
    divRef.current?.scrollIntoView({behavior:"smooth"})
  }, [ chatInfoList])
  return (
    <div className="chatInfo">
      {
        chatInfoList.map((item) => (
          <div key={item.chatInfoId} className={
            clsx('chatInfo-item', item.senderInfo.uid === userInfo?.uid ? 'isMe' : "") 
          } ref={divRef}>
            <div className="userInfo">
              <div className="userInfo-main">
                <div className="">
                  <CustomImage url={baseUrl + item.senderInfo.avatar} width="60px" height="60px" />
                  <p>{item.content}</p>
                </div>
                <span>{new Date(item.sendTime).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
})
export default ChatInfo