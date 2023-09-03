import CustomIcon from "@/components/IconFont/CustomIcon";
import "./MobileBar.less"
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
const MobileBar = () => {
  return (
    <div className="mobileBar">
        <ul>
            {
                list.map((item)=>(
                    <li key={item.name}>
                        <CustomIcon name={item.name} size="big"/>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
export default MobileBar