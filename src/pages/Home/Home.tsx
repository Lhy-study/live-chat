import LeftSideBar from "../../layout/LeftSideBar/LeftSideBar";
import MobileBar from "@/layout/MobileBar/MobileBar";
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router";
import { UserInfoContext ,type UserInfoContextType} from "@/Context/userContext"
import { useContext } from "react";
import { type UserInfo } from "@/interface";
import EmptyState from "@/components/EmptyState/EmptyState";
const Home = () => {
  const { userInfo } = useContext(UserInfoContext) as UserInfoContextType
  const { uid } = userInfo as UserInfo
  return (
    <div className="home">
      {
        uid ? <></> : <Navigate to={"/"} />
      }
      <div className="container">
        <LeftSideBar />
        <MobileBar />
        <main>
          <div className="bar">
            <Outlet />
          </div>
          <div className="content">
            <EmptyState />
          </div>
        </main>
      </div>
    </div>
  )
}
export default Home