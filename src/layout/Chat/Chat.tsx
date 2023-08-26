import ChatInfo from "@/components/ChatInfo/ChatInfo"
import SendMsg from "@/components/SendMsg/SendMsg"
import main from "@/layout/Chat/Chat.module.less"
const Chat = () => {
  return (
    <div className={main.chat}>
      <ChatInfo />
      <SendMsg />
    </div>
  )
}
export default Chat