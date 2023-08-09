import { NavLink } from "react-router-dom"
import NavLinkCss from "./CustomNavLink.module.css"

interface NavLink{
    path:string
    children:string
}

const CustomNavLink:React.FC<NavLink> = ({path,children}) => {
  return (
    <NavLink to={path} className={({isActive})=>isActive ? `${NavLinkCss.active}`: ''}>{children}</NavLink>
  )
}
export default CustomNavLink