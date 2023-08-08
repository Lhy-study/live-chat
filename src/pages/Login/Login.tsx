import CustomForm from "../../components/CustomForm/CustomForm"
import home from "./home.module.less"
const Login = () => {
  return (
    <div className={home.home}>
        <h2>欢迎来到live-chat | welcome to live-chat</h2>
        <CustomForm />
    </div>
  )
}
export default Login