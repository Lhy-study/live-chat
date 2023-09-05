import { NavLink } from "react-router-dom"
import NavLinkCss from "./CustomNavLink.module.css"
import { ReactNode } from "react"

interface NavLink{
    path:string
    children:ReactNode
}

const CustomNavLink:React.FC<NavLink> = ({path,children}) => {
  return (
    <NavLink to={path} className={({isActive})=>isActive ? `${NavLinkCss.active}`: ''}>{children}</NavLink>
  )
}
export default CustomNavLink