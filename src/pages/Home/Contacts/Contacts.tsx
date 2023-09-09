import "./Contacts.less"
import CustomIcon from "@/components/IconFont/CustomIcon"
import UserList from "@/components/UserList/UserList"
import testImage from "@/assets/react.svg"
import Layout from "../Layout"
import PubSub from "pubsub-js"
import { memo } from "react"

const Contacts = memo(() => {
  const handle=()=>{
    PubSub.publish("openDialog",true)
  }
  const arr = [
    {
      url: testImage,
      name: "nihao",
      id: 1
    }
  ]
  return (
    <Layout>
      <header>
        <p>联系人</p>
        <div onClick={handle}>
          <CustomIcon name="icon-tianjiahaoyou" size="big" />
        </div>
      </header>
      {
        arr.map(item => (
          <UserList id={item.id} name={item.name} imgUrl={item.url} key={item.id} />
        ))
      }
    </Layout>
  )
})
export default Contacts