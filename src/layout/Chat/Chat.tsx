import ChatInfo from "@/components/ChatInfo/ChatInfo"
import SendMsg from "@/components/SendMsg/SendMsg"
import TopSider from "@/components/TopSider/TopSider"
import main from "@/layout/Chat/Chat.module.less"
const Chat = () => {
  return (
    <div className={main.chat}>
      <TopSider />
      <ChatInfo />
      <SendMsg />
    </div>
  )
}
export default Chat