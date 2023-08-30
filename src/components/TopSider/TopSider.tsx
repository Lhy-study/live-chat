import "./TopSider.less"
import CustomIcon from "../IconFont/CustomIcon"
const TopSider = () => {
  return (
    <div className="topSider">
      <p>Jane</p>
      <div className="fc">
        <CustomIcon name="icon-shezhi" color="black" size="big"/>
        <CustomIcon name="icon-pengyouquan" color="black" size="big"/>
      </div>
    </div>
  )
}
export default TopSider