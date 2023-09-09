import "./SendMsg.less"
import { memo } from "react"
import IconFont from "@/components/IconFont/CustomIcon"
const SendMsg = memo(() => {
  return (
    <div className="sendMsg">
      <div className="widgets">
        <IconFont name="icon-biaoqing1"/>
        <IconFont name="icon-tupian"/>
      </div>
      <textarea name="" id="" rows={3} placeholder="输入的长度不可超过200" autoComplete="off"/>
      <div className="send">
        <IconFont name="icon-fasong"/>
      </div>
    </div>
  )
})
export default SendMsg