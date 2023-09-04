import "./Contacts.less"
import CustomIcon from "@/components/IconFont/CustomIcon"
import Mask from "@/components/Mask/Mask"
import UserList from "@/components/UserList/UserList"
import AddFriendForm from "@/components/AddFriendFrom/AddFriendForm"
import testImage from "@/assets/react.svg"

import { useState } from "react"
const Contacts = () => {
  const [show, setShow] = useState(false);
  const arr=[
    {
      url:testImage,
      name:"nihao",
      id:1
    }
  ]

  //打开遮罩层
  function handle(){
    setShow(true)
  }

  //关闭遮罩层
  function unhandle(){
    setShow(false);
  }
  return (
    <div className="contact">
      <header>
        <p>联系人</p>
        <div onClick={handle}>
          <CustomIcon name="icon-tianjiahaoyou" size="big" />
        </div>
      </header>
      {
        arr.map(item=>(
          <UserList id={item.id} name={item.name} imgUrl={item.url} key={item.id}/>
        ))
      }
      {
        show && <Mask callback={unhandle}>
          <AddFriendForm />
        </Mask>
      }
    </div>
  )
}
export default Contacts