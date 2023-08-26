import React from "react";
import buttonCss from "./button.module.less"

interface buttonProps{
    children:string
    disabled:boolean
    type?:'submit'|'reset',
    reset?:()=>void,
}

const CustomButton:React.FC<buttonProps> = React.memo(({children,disabled,type="submit",reset}) => {
  return (
    <div>
        <button disabled={disabled} className={buttonCss.btn} type={type} onClick={reset} >{children}</button>
    </div>
  )
})
export default CustomButton