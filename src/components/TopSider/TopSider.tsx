import "./TopSider.less"
import CustomIcon from "../IconFont/CustomIcon"
const TopSider = () => {
  return (
    <div className="topSider">
      <p>Jane</p>
      <div className="fc">
        <CustomIcon name="icon-shezhi" size="big"/>
        <CustomIcon name="icon-pengyouquan" size="big"/>
      </div>
    </div>
  )
}
export default TopSider