import "./CurrentUser.less"
import CustomImage from "../CustomImage/CustomImage"
import { UserInfoContext, type UserInfoContextType } from "@/Context/userContext"
import { useContext  , useState} from "react"
import { type UserInfo } from "@/types/interface"
import { baseUrl } from "@/baseConfig"
import { publish } from "pubsub-js"
const CurrentUser = () => {
    const handleClick=()=>{
        publish("userOpen",true);
        publish("update",userInfo);
      }
      const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
      const [currentUser  ] = useState<UserInfo|null>(userInfo)
    return (
        <div className="currentUser">
            <CustomImage
                width="3rem"
                height="3rem"
                url={baseUrl + currentUser?.avatar}
                onClick={handleClick}
                title={currentUser?.username}
            />
        </div>
    )
}
export default CurrentUser