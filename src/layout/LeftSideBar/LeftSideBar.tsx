import NavBar from "@/components/NavBar/NavBar"
import main from "./LeftSideBar.module.less"
import UserSearch from "@/components/UserSearch/UserSearch"
const LeftSideBar = () => {
  return (
    <div className={main.sideBar}>
      <NavBar />
      <UserSearch />
    </div>
  )
}
export default LeftSideBar
