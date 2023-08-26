import React, { useState, useCallback } from 'react';
import FormProps from "./FormProp";
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from '../CustomButton/CustomButton';
import FormCss from "./CustomForm.module.less";
import { login } from '../../api/user';

type variant = 'Login' | 'Register'

const AuthForm: React.FC = () => {
  const { formState: { errors }, register, handleSubmit, watch, reset } = useForm<FormProps>({
    mode: "all",
    reValidateMode: "onChange",
  });
  const [disabled, setDisabled] = useState(false);
  const [variant, setVariant] = useState<variant>('Login');  //用来分别是渲染登录页面还是注册页面的组件
  const toggleVariant = useCallback(() => {
    if (variant === 'Login') {
      setVariant('Register')
    } else {
      setVariant('Login')
    }
  }, [variant])
  // const submit: SubmitHandler<FormProps> = data => {
  //   // console.log(data);
  //   useCallback(()=>{

  //   },[data])
  // };

  const submit=useCallback((data:FormProps)=>{
    if(variant === 'Login'){
      setDisabled(true);
      login({username:data.name,password:data.password})?.then((res)=>{
        console.log(res);
      }).finally(()=>{
        setDisabled(false)
        console.log(11);
      })
      
      console.log('登录');
    }else{
      console.log('注册');
    }
    console.log(data);
  },[variant])
  
  //传递一个reset方法给CustomButton组件使得可以重置表单
  const resetHandler=useCallback(()=>{
    reset();
  },[reset])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <CustomInput
        name='name'
        type='text'
        tip='用户名'
        register={register}
        error={errors.name}
        disabled={disabled}
        value={watch("name")}
        rules={[
          (v) => v.trim() !== "" || `用户名不可以空`,
          (v) => /^[\u4e00-\u9fa5a-zA-Z0-9]{1,7}$/.test(v) || '请符合中文或字母长度不超过8的用户名'
        ]} />
      <CustomInput
        name='password'
        type='password'
        tip='密码'
        register={register}
        error={errors.password}
        disabled={disabled}
        value={watch("password")}
        rules={[
          (v) => v.trim() !== "" || `密码不可以为空`,
          (v) => /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(v) || '8到16位包含字母、数字的密码'
        ]} />
      {
        variant === 'Login' || (
        <CustomInput
          name='conFirmPw'
          type='password'
          tip='确认密码'
          register={register}
          error={errors.conFirmPw}
          disabled={disabled}
          value={watch('conFirmPw')!}
          rules={[
            (v) => v.trim() !== "" || `密码不可以为空`,
            (v) => /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(v) || '8到16位包含字母、数字的密码',
            (v) => v === watch('password') || '两次密码不一致，请重新确认密码'
          ]} />)
      }
      <div className={FormCss.btn}>
        {
          variant === 'Login' ?
            (<CustomButton disabled={false} >登录</CustomButton>) :
            (<CustomButton disabled={false} >注册</CustomButton>)
        }
        <CustomButton disabled={false} type='reset' reset={resetHandler}>重置</CustomButton>
      </div>
        <p className={FormCss.p}>{variant === 'Login' ? '还没有Live-char账号？' : '已经拥有账号？'} 
          <span onClick={() => { toggleVariant(); resetHandler() }}>点击前往</span> 
        </p>
    </form>
  );
}

export default AuthForm;
