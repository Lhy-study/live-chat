import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface IFormInput {
    firstName: string;
    lastName: string;
    age: number;
  }

interface InputProps {
  type: string;
  label: string;
  name: keyof IFormInput;
  register: UseFormRegister<IFormInput>; // Update the register function type
  required?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  error?: FieldError | undefined;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  register,
  required,
  maxLength,
  pattern,
  min,
  max,
  error,
}) => {
  console.log(error);
  return (
    <div>
      <label htmlFor="label">{label}</label>
      <input
        type={type}
        {...register(name, {
          required: required && "This field is required",
          maxLength: maxLength && {
            value: maxLength,
            message: `Max length is ${maxLength}`,
          },
          pattern: pattern && {
            value: pattern,
            message: "Invalid input",
          },
          min: min && {
            value: min,
            message: `Min value is ${min}`,
          },
          max: max && {
            value: max,
            message: `Max value is ${max}`,
          },
          validate:(v)=>v!=="111"||"不等于111"
        })}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Input;
