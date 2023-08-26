import React  from "react";
import clsx from "clsx";
import "./IconFont.less";
//icon图标的大小
type iconsize = 'small'|'default'|'big'
interface IconProp{
    name:string
    size?:iconsize
    color?:string
}

const IconFont:React.FC<IconProp> = ({name,size='default',color='#ccc'}) => {
  return (
            <span className={clsx('iconfont',name,clsx(`${size}Icon`))} style={{color:color}}></span>
  )
}
export default IconFont