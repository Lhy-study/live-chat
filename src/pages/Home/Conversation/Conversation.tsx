import "./Conversation.less"
import Layout from "../Layout"
import CurrentUser from "@/components/CurrentUser/CurrentUser"
import { memo, useEffect, useState } from "react"
import { getConversationList } from "@/api/conversation"
import { converSationInfo, ChatMsgInfo, UserInfo } from "@/types/interface"
import { useNavigate ,useParams} from "react-router"
import { baseUrl } from "@/baseConfig"
import clsx from "clsx"
interface conversationType extends converSationInfo {
  Users: UserInfo[]
  endChat: ChatMsgInfo | null
}

const Conversation = memo(() => {
  const { convId } = useParams()
  const Navigate = useNavigate();
  const [convList, setConvList] = useState<conversationType[]>([])
  useEffect(() => {
    getConversationList()
      .then(({ data }) => {
        // console.log(data);
        setConvList(data.data)
      })
      .catch((e) => {
        console.log(e.msg);
      })
  }, [])
  return (
    <Layout>
      <div className="conversation-top">
        <h1 className="conversation-h1">会话聊天</h1>
        <div className="mobile-user">
          <CurrentUser />
        </div>
      </div>
      {
        convList.length == 0 ?
          <div className="not-conv"> <p>您暂时还没有对话哦</p> </div> :
          convList.map((item) => (
            <div
              className={clsx('conversation-item',`${item.convId === parseInt(convId!) ? 'conversation-check' : ''}`)}
              key={item.convId}
              onClick={() => { Navigate(`/home/conversation/${item.convId}`); }}>
              <div className="conversation-item-main">
                <img src={baseUrl + item.Users[0].avatar} alt="" />
                <div className="txt">
                  <p>{item.Users[0].username}</p>
                  {
                    !item.endChat ? <span>默认消息：还没开始聊天哦~</span> : <span>{ item.endChat.contentType.toString() === 'TEXT' ? item.endChat.content : '非文本消息' }</span>
                  }
                </div>
                <div className="time">
                  { new Date(item.createTime).toDateString() }
                </div>
              </div>
            </div>
          ))
      }
    </Layout>
  )
})
export default Conversation