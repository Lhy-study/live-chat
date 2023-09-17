import React ,{ memo } from "react";
import clsx from "clsx";
import "./CustomIcon.less";
//icon图标的大小
type iconsize = 'small'|'default'|'big'
interface IconProp{
    name:string
    size?:iconsize
    onClick?:()=>void
}

const CustomIcon:React.FC<IconProp> = memo(({name,size='default',onClick}) => {
  return (
            <span 
              className={clsx('iconfont',name,clsx(`${size}Icon`))} 
              onClick={onClick}
            >
            </span>
  )
})
export default CustomIcon