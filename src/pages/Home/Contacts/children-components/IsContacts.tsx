import CustomIcon from "@/components/IconFont/CustomIcon"
import UserList from "@/components/UserList/UserList"
import testImage from "@/assets/react.svg"
import PubSub from "pubsub-js"

const IsContacts = () => {
    const handle = () => {
        PubSub.publish("openDialog", true)
    }
    const checkout = ()=>{
        PubSub.publish("isContacts",false)
    }
    const arr = [
        {
            url: testImage,
            name: "nihao",
            id: 1
        }
    ]
    return (
        <div className="contacts contacts-true">
            <header>
                <p>联系人</p>
                <div onClick={handle}>
                    <CustomIcon name="icon-tianjiahaoyou" size="big" />
                </div>
            </header>
            <span onClick={checkout} className="iconfont icon-qiehuan">查看好友请求</span>
            {
                arr.map(item => (
                    <UserList id={item.id} name={item.name} imgUrl={item.url} key={item.id} />
                ))
            }
        </div>
    )
}
export default IsContacts