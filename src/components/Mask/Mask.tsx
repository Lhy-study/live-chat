import React, { ReactNode } from "react"
import "./Mask.less"
//写一个遮罩层组件
interface MaskProp{
    children: ReactNode,
    callback:()=>void //由父组件传过来一个可以直接关闭遮罩层的方法
}

const Mask: React.FC<MaskProp> = ({ children,callback }) => {
    return (
        <div className="mask" onClick={callback}>
            {
                children
            }
        </div>
    )
}
export default Mask