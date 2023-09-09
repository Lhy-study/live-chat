import CustomForm from "../../components/CustomForm/CustomForm"
import home from "./home.module.less";
import { memo } from "react"
const Login = memo(() => {  
  return (
    // 加 <div className={home.div}> 是因为这个界面要高度自适应并且水平垂直居中，用上下左右定位加margin:auto高度会撑满视口，
    //而使用 transform translate这个会改变坐标系，到时候toast这个定位是固定定位，因为坐标系改变了，就不再是参考浏览器
    //为此再次基础上再加上一个div使用flex布局
    <div className={home.div}>
      <div className={home.home}>
        <h2> Welcome To Live-chat !!!</h2>
        <CustomForm />
      </div>
    </div>
  )
})
export default Login