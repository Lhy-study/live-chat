import "./UserList.less";
import CustomImage from "../CustomImage/CustomImage";
interface UserListProp {
    imgUrl: string,
    name: string,
    id: number
}
const UserLIst: React.FC<UserListProp> = ({
    imgUrl,
    name,
    id
}) => {
    return (
        <div key={id} className="userList">
            <div className="avatar">
                <CustomImage url={imgUrl} />
            </div>
            <p>{name}</p>
        </div>
    )
}
export default UserLIst