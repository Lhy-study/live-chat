import NavBar from "@/layout/NavBar/NavBar"
import main from "./LeftSideBar.module.less"
import CustomImage from "@/components/CustomImage/CustomImage"
import { useContext } from "react"
import { UserInfoContext, type UserInfoContextType } from "@/context/userContext"
import { type UserInfo } from "@/interface"
import { baseUrl } from "@/baseConfig"
const LeftSideBar = () => {
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const { avatar } = userInfo as UserInfo
  return (
    <div className={main.sideBar}>
      <NavBar />
      <div className={main.img}>
        <CustomImage
          width="3rem"
          height="3rem"
          url={baseUrl + avatar}
        />
      </div>
    </div>
  )
}
export default LeftSideBar
