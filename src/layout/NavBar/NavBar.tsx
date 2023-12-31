// import main from "@/components/NavBar/NavBar.module.less"
import "./NavBar.less";
import CustomIcon from "../../components/IconFont/CustomIcon";
import { NavLink } from "react-router-dom";
import { memo } from "react"

const list = [
  {
    name: "icon-xiaoxi-zhihui",
    path:"/conversation"
    // path:"/"
  },
  {
    name: "icon-lianxiren",
    path:"/contacts"
  },
  {
    name:"icon-pengyouquan",
    path:"/friendcircle"
  },
  {
    name: "icon-exit-full"
  }
]
const NavBar = memo(() => {
  return (
    <nav>
      <ul className="navTop">
        {
          list.map((item) => (
            <NavLink to={`/home`+item.path} key={item.name} className={({isActive})=>isActive ? 'active' : '' }><li>
              <CustomIcon name={item.name} size="big"/>
            </li></NavLink>
          ))
        }
      </ul>
    </nav>
  )
})
export default NavBar