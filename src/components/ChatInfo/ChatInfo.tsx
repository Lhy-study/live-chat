import "./ChatInfo.less"
import { useParams } from "react-router"
import { memo, useEffect, useState, useContext } from "react"
import { type ChatMsgInfo, chat_info_type } from "@/types/interface"
import { getChatInfoList } from "@/api/chat"
import { UserInfoContext, type UserInfoContextType } from "@/Context/userContext"
import { subscribe } from "pubsub-js"
import clsx from "clsx"
import CustomImage from "../CustomImage/CustomImage"
import { baseUrl } from "@/baseConfig"

interface messageType {
  convId: number
  senderId: number
  content: string
  contentType: chat_info_type
}

const subScribeFun = (_: string, data: messageType) => {
  //这里做实时聊天时socket.io放回来的
  console.log(data);
}

const ChatInfo = memo(() => {
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const [chatInfoList, setChatInfoList] = useState<ChatMsgInfo[]>([])
  const { convId } = useParams()

  useEffect(() => {
    getChatInfoList(parseInt(convId!))
      .then(({ data: { data } }) => {
        console.log(data);
        setChatInfoList([...data])
      })
      .catch((e) => {
        console.log(e.msg);
      })
  }, [convId])
  useEffect(() => {
    subscribe("message", subScribeFun)
  }, [  ])
  return (
    <div className="chatInfo">
      {
        chatInfoList.map((item) => (
          <div key={item.chatInfoId} className={
            clsx('chatInfo-item', item.senderInfo.uid === userInfo?.uid ? 'isMe' : "")
          }>
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