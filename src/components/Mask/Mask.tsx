import React, { ReactNode, useCallback } from "react"
import "./Mask.less"
//写一个遮罩层组件
interface MaskProp {
    children: ReactNode,
    callback: () => void //由父组件传过来一个可以直接关闭遮罩层的方法
}

const Mask: React.FC<MaskProp> = ({ children, callback }) => {
    // const divRef = useRef<HTMLDivElement | null>(null);
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e);
        // console.log(e.currentTarget);
        // console.log(e.target);
        // console.log(e.target == e.currentTarget);//这是不等于的 
        if (e.target == e.currentTarget) {
            // 只有当点击的是 div 元素时才触发回调函数
            callback();
        }
    }, [callback])


    return (
        <div className="mask" onClick={handleClick}>
            {children}
        </div>
    )
}
export default Mask