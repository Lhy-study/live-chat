import "./SendMsg.less"
import IconFont from "@/components/IconFont/IconFont"
const SendMsg = () => {
  return (
    <div className="sendMsg">
      <div className="widgets">
        <IconFont name="icon-biaoqing1"/>
        <IconFont name="icon-tupian"/>
      </div>
      <textarea name="" id="" rows={3} placeholder="输入的长度不可超过200" autoComplete="off"/>
    </div>
  )
}
export default SendMsg