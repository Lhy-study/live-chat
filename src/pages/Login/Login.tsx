import CustomForm from "../../components/CustomForm/CustomForm"
import home from "./home.module.less"
const Login = () => {
  return (
    <div className={home.home}>
        <h2> Welcome To Live-chat !!!</h2>
        <CustomForm />
    </div>
  )
}
export default Login