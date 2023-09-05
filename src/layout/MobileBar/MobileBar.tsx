import CustomIcon from "@/components/IconFont/CustomIcon";
import "./MobileBar.less"
import CustomNavLink from "@/components/CustomNavLink/CustomNavLink";
const list = [
  {
    name: "icon-xiaoxi-zhihui",
    path: "/home/contacts"
  },
  {
    name: "icon-lianxiren",
    path: "/home/conversation"
  },
  {
    name: "icon-exit-full",
    path: "/"
  }
]
const MobileBar = () => {
  return (
    <div className="mobileBar">
      <ul>
        {
          list.map((item) => (

            <li key={item.name}>
              <CustomNavLink path={item.path}>
                <CustomIcon name={item.name} size="big" />
              </CustomNavLink>
            </li>

          ))
        }
      </ul>
    </div>
  )
}
export default MobileBar