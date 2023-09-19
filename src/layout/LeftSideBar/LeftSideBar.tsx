import main from "./LeftSideBar.module.less"
import NavBar from "@/layout/NavBar/NavBar"
import CurrentUser from "@/components/CurrentUser/CurrentUser"
const LeftSideBar = (() => {
  return (
    <div className={main.sideBar}>
      <NavBar />
      <CurrentUser />
    </div>
  )
})
export default LeftSideBar
