import React, { useState } from 'react';
import FormProps from "./FormProp";
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from '../CustomButton/CustomButton';
import FormCss from "./CustomForm.module.less"

const AuthForm: React.FC = () => {
  const { formState: { errors }, register, handleSubmit, watch ,reset} = useForm<FormProps>({
    mode: "all",
    reValidateMode: "onChange",
  });

  // console.log(formState);

  const Submit: SubmitHandler<FormProps> = data => {
    // console.log(data);
  };

  function resetHandler(){
    reset();
  }

  const [disabled, setDisabled] = useState(false);

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
        ]}
      />
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
        ]}
      />
      <div className={FormCss.btn}>
        <CustomButton disabled={false}>登录</CustomButton>
        <CustomButton disabled={false} type='reset' reset={resetHandler}>重置</CustomButton>
      </div>
    </form>
  );
}

export default AuthForm;
