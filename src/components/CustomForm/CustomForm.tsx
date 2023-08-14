import React, { useState, useCallback } from 'react';
import FormProps from "./FormProp";
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from '../CustomButton/CustomButton';
import FormCss from "./CustomForm.module.less"

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
  const Submit: SubmitHandler<FormProps> = data => {
    console.log(data);
  };
  
  //传递一个reset方法给CustomButton组件使得可以重置表单
  function resetHandler() {
    reset();
  }

  function LoginHandler(){
    console.log("登录");
  }

  function RegHandler(){
    console.log("注册");
  }


  return (
    <form onSubmit={handleSubmit(Submit)}>
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
          (v) => /^[\w-]{4,16}$/.test(v) || '4到16位(字母,数字,下划线,减号)'
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
          (v) => /^[\w-]{4,16}$/.test(v) || '4到16位(字母,数字,下划线,减号)'
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
            (v) => /^[\w-]{4,16}$/.test(v) || '4到16位(字母,数字,下划线,减号)',
            (v) => v === watch('password') || '两次密码不一致，请重新确认密码'
          ]} />)
      }
      <div className={FormCss.btn}>
        {
          variant === 'Login' ?
            (<CustomButton disabled={false} onClick={LoginHandler}>登录</CustomButton>) :
            (<CustomButton disabled={false} onClick={RegHandler}>注册</CustomButton>)
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
