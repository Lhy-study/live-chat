
import React from 'react'
import FormProps from "../CustomForm/FormProp";
import { FieldError, UseFormRegister } from "react-hook-form";
import { memo } from "react"
import custom from "./input.module.less"
import clsx from 'clsx';

interface InputProps {
  type: string
  name: keyof FormProps
  error: FieldError | undefined
  disabled: boolean//用于在登录中不可进行修改
  register: UseFormRegister<FormProps>
  rules:Array<(v1:string)=>boolean|string>
  tip:string
  value:string
}

const customInput: React.FC<InputProps> = memo(({
  type, name, error, disabled, register,tip,value,rules
}) => {
  // console.log(error,value)
  // const validate=rules.map((item,index)=>obj[index+1]=item)
  const validate = rules.reduce((acc:{[propsname:string]:(v:string)=>boolean|string}, currentValue, index) => {
    acc[index + 1] = currentValue;
    return acc;
  }, {});
  // console.log(validate);
  
  // return (
  //   <div className={custom.custom}>
  //     <div className={custom.one}>
  //       <input
  //         autoComplete='off'
  //         type={type}
  //         // className={Input.input}
  //         {...register(name, {
  //           validate,
  //         })}
  //         disabled={disabled}
  //         className={clsx(!value ? `${custom.default}` : `${custom.input}`,error && `${custom.red}`)} 
  //         // className={custom.input}
  //       />
  //         <span>{tip}</span>
  //     </div>
  //     <p className={custom.redError} >
  //       {error && `*${error?.message}` }
  //     </p>
  //   </div>
  // )

  return (
  <div className={custom.component}>
    <div className={clsx(custom.div,error && `${custom.divErr}`)}>
      <input 
        type={type} 
        id={name}
        autoComplete='off'
        disabled={disabled}
        className={clsx(value ? `${custom.success}` : '')} 
        {
          ...register(name,{
            validate
          })
        }
      />
      <label htmlFor={name} className={clsx(custom.label,error && custom.labelErr)}>{tip}</label>
    </div>
    {
      <p className={custom.eMsg} >
        {error && `*${error?.message}` }
      </p>
    }
  </div>
  )
})

export default customInput