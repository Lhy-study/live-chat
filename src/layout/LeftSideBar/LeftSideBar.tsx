import NavBar from "@/layout/NavBar/NavBar"
import main from "./LeftSideBar.module.less"
import CustomImage from "@/components/CustomImage/CustomImage"
import { useContext , memo , useState} from "react"
import { UserInfoContext, type UserInfoContextType } from "@/Context/userContext"
import { type UserInfo } from "@/types/interface"
import { baseUrl } from "@/baseConfig"
import { publish } from "pubsub-js"
const LeftSideBar = memo(() => {
  const handleClick=()=>{
    // console.log(userInfo);
    
    publish("userOpen",true);
    publish("update",userInfo);
  }
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const { avatar } = userInfo as UserInfo
  const [ url ] = useState(avatar)
  return (
    <div className={main.sideBar}>
      <NavBar />
      <div className={main.img}>
        <CustomImage
          width="3rem"
          height="3rem"
          url={baseUrl + url}
          onClick={handleClick}
        />
      </div>
    </div>
  )
})
export default LeftSideBar
