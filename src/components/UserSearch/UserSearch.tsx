import { memo } from "react"
import CustomImage from "../CustomImage/CustomImage"
import "./UserSearch.less"
const UserSearch = memo(() => {
  return (
    <div className="userSearch">
       <div className="search">
            <input type="text" placeholder="好友搜索"/>
       </div>
       <ul className="userList">
            <li>
              <div className="img">
                <CustomImage url="https://img2.wallspic.com/previews/8/7/2/6/6/166278/166278-tou_xiang-ni_ke-cheng_se-yi_shu-duan_ku-x750.jpg"/>
              </div>
                <p>jane</p>
            </li>
       </ul>
    </div>
  )
})
export default UserSearch