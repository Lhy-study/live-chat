import NavBar from "@/components/NavBar/NavBar"
import main from "./LeftSideBar.module.less"
NavBar
const LeftSideBar = () => {
  return (
    <div className={main.sideBar}>
      <NavBar />
    </div>
  )
}
export default LeftSideBar
