import "./Layout.less"
import EmptyState from "@/components/EmptyState/EmptyState"
import { ReactNode,useState } from "react"
import { Outlet } from "react-router-dom"
import PubSub from "pubsub-js"
import clsx from "clsx"
interface prop{
  children:ReactNode
}
const Layout:React.FC<prop> = ({children}) => {
  const [isOpen,setIsOpen] = useState(false);
  const Subscriber = (msg: string, value: boolean) => {
    setIsOpen(value)
  }
  PubSub.subscribe("change", Subscriber)
  return (
    <div className="parent">
      <div className={clsx(`${isOpen ? 'hidden' : ''}`,"parent-bar")}>
        <div className="parent-main">
          {children}
        </div>
      </div>
      <div className="children">
        {
          !isOpen && <EmptyState />
        }
        <div className="children-main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Layout