import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input"; // Import the newly created Input component

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode:"all",
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="First Name"
        name="firstName"
        register={register}
        required={true}
        maxLength={20}
        error={errors.firstName}
      />

      <Input
        type="text"
        label="Last Name"
        name="lastName"
        register={register}
        pattern={/^[A-Za-z]+$/i}
        error={errors.lastName}
      />

      <Input
        type="number"
        label="Age"
        name="age"
        register={register}
        min={18}
        max={99}
        error={errors.age}
      />

      <input type="submit" />
    </form>
  );
}
