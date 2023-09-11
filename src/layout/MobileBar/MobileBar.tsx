import CustomIcon from "@/components/IconFont/CustomIcon";
import "./MobileBar.less"
import CustomNavLink from "@/components/CustomNavLink/CustomNavLink";
import PubSub from "pubsub-js";
import { useState ,useEffect} from "react"
const list = [
  {
    name: "icon-xiaoxi-zhihui",
    path: "/home/conversation"
  },
  {
    name: "icon-lianxiren",
    path: "/home/contacts"
  },
  {
    name: "icon-exit-full",
    path: "/"
  }
]
const MobileBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    const Subscriber = (_: string, value: boolean) => {
      setIsOpen(value)
    }
    PubSub.subscribe("change", Subscriber)
  },[])
  return (
    <>
      {
        !isOpen && <div className="mobileBar">
          <ul>
            {
              list.map((item) => (

                <li key={item.name}>
                  <CustomNavLink path={item.path}>
                    <CustomIcon name={item.name} size="big" />
                  </CustomNavLink>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </>
  )
}
export default MobileBar