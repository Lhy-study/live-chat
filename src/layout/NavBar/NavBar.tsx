// import main from "@/components/NavBar/NavBar.module.less"
import "./NavBar.less";
import CustomIcon from "../../components/IconFont/CustomIcon";
import { NavLink } from "react-router-dom";

const list = [
  {
    name: "icon-tianjiahaoyou"
  },
  {
    name: "icon-lianxiren"
  },
  {
    name: "icon-exit-full"
  }
]
const NavBar = () => {
  return (
    <nav>
      <ul className="navTop">
        {
          list.map((item) => (
            <NavLink to="/home" key={item.name} className={({isActive})=>isActive ? 'active' : '' }><li>
              <CustomIcon name={item.name} size="big"/>
            </li></NavLink>
          ))
        }
      </ul>
    </nav>
  )
}
export default NavBar