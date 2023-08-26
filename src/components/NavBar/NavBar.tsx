// import main from "@/components/NavBar/NavBar.module.less"
import "./NavBar.less";
const NavBar = () => {
  return (
    <div className="navBar">
        <div className="logo">
            Live Chat
        </div>
        <div className="userinfo">
            <img src="https://img2.wallspic.com/previews/8/7/2/6/6/166278/166278-tou_xiang-ni_ke-cheng_se-yi_shu-duan_ku-x750.jpg" alt="" />
            <span>lhy</span>
            <button type="button">注销</button>
        </div>
    </div>
  )
}
export default NavBar