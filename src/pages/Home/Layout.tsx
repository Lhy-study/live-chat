import "./Layout.less"
import EmptyState from "@/components/EmptyState/EmptyState"
import { ReactNode,useState ,memo,useEffect} from "react"
import { Outlet } from "react-router-dom"
import PubSub from "pubsub-js"
import clsx from "clsx"
interface prop{
  children:ReactNode
}
const Layout:React.FC<prop> = memo(({children}) => {
  const [isOpen,setIsOpen] = useState(false);
  const Subscriber = (_: string, value: boolean) => {
    setIsOpen(value)
  }
  useEffect(()=>{
    PubSub.subscribe("EmptyShow", Subscriber)
  },[isOpen])
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
})
export default Layout