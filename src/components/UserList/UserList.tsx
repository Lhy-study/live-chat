import "./UserList.less";
import { memo } from "react"
import CustomImage from "../CustomImage/CustomImage";
interface UserListProp {
    imgUrl: string,
    name: string,
    id: number,
    onClick?:()=>void
}
const UserLIst: React.FC<UserListProp> = memo(({
    imgUrl,
    name,
    id,
    onClick
}) => {
    return (
        <div className="userList" key={id} onClick={onClick}>
            <div className="avatar">
                <CustomImage url={imgUrl} />
            </div>
            <p>{name}</p>
        </div>
    )
})
export default UserLIst