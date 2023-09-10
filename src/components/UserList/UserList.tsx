import "./UserList.less";
import { memo } from "react"
import CustomImage from "../CustomImage/CustomImage";
interface UserListProp {
    imgUrl: string,
    name: string,
    id: number
}
const UserLIst: React.FC<UserListProp> = memo(({
    imgUrl,
    name,
    id
}) => {
    return (
        <div className="userList" key={id}>
            <div className="avatar">
                <CustomImage url={imgUrl} />
            </div>
            <p>{name}</p>
        </div>
    )
})
export default UserLIst