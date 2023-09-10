import "./Contacts.less"
import Layout from "../Layout"
import PubSub from "pubsub-js"
import { memo, useState ,useEffect} from "react"
import IsContacts from "./children-components/IsContacts"
import NotContacts from "./children-components/NotContacts"

const Contacts = memo(() => {
  const [state, setSate] = useState(true) //是否为联系人的内容
  const subscribe=(_:string,value:boolean)=>{
    setSate(value)
  }
  useEffect(()=>{
    PubSub.subscribe("isContacts",subscribe)
  },[])
  return (
    <Layout>
      {
        state ? 
        <IsContacts />
        : 
        <NotContacts />
      }
    </Layout>
  )
})
export default Contacts