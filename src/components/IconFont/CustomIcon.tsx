import React ,{ memo } from "react";
import clsx from "clsx";
import "./CustomIcon.less";
//icon图标的大小
type iconsize = 'small'|'default'|'big'
interface IconProp{
    name:string
    size?:iconsize
    color?:string
}

const CustomIcon:React.FC<IconProp> = memo(({name,size='default',color='#ccc'}) => {
  return (
            <span className={clsx('iconfont',name,clsx(`${size}Icon`))} style={{color:color}}></span>
  )
})
export default CustomIcon