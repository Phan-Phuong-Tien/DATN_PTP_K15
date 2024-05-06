import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "layout/Authentication";
import FormGroup from "components/form/FormGroup";
import Label from "components/form/Label";
import Input from "components/form/Input";
import ButtonGradient from "components/button/ButtonGradient";
import ErrorMessage from "components/form/ErrorMessage";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { registerUser } from "redux/auth/authRequest";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Đây là trường bắt buộc")
    .min(2, "Tên có ít nhất 2 ký tự"),
  lastName: yup
    .string()
    .required("Đây là trường bắt buộc")
    .min(2, "Họ có ít nhất 2 ký tự"),
  email: yup
    .string()
    .required("Đây là trường bắt buộc")
    .email("Email này không đúng cú pháp"),
  password: yup
    .string()
    .required("TĐây là trường bắt buộc")
    .min(6, "Mật khẩu phải là 6 ký tự trở lên")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/,
      "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
    ),
  phone: yup
    .string()
    .required("Đây là trường bắt buộc")
    .matches(/^[0-9]*$/, "Số điện thoại chỉ được chứa các ký tự số")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
});

const initialValue = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  password: "",
  gender: "male",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Đăng Ký | FreshConnect";
  }, []);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });
  const { isLoading } = useSelector((state) => state.auth.register);
  const handleRegister = (values) => {
    dispatch(
      registerUser({
        userData: values,
        initialValue,
        reset,
        setError,
        navigate,
      })
    );
  };
  

  return (
    <Authentication heading="Đăng Ký">
      <form
        className="flex flex-col gap-y-5"
        autoComplete="off"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <FormGroup>
            <Label name="firstName" className="mb-2">
              Tên *
            </Label>
            <Input
              //defaultValue={initialValue.firstName}
              control={control}
              name="firstName"
              placeholder={"Tên"}
              error={errors?.firstName}
            ></Input>
            {errors?.firstName && (
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label name="lastName" className="mb-2">
              Họ *
            </Label>
            <Input
              control={control}
              name="lastName"
              placeholder={"Họ"}
              error={errors?.lastName}
            ></Input>
            {errors?.lastName && (
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            )}
          </FormGroup>
        </div>
        <FormGroup>
          <Label name="email" className="mb-2">
            Email *
          </Label>
          <Input
            placeholder={"Nhập email của bạn"}
            name="email"
            control={control}
            type="email"
            error={errors?.email}
          ></Input>
          {errors?.email && (
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label name="phone" className="mb-2">
            Số điện thoại *
          </Label>
          <Input
            placeholder={"Nhập số điện thoại của bạn"}
            name="phone"
            control={control}
            type="phone"
            error={errors?.phone}
          ></Input>
          {errors?.phone && (
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="mb-2" name="password">
            Mật khẩu *
          </Label>
          <Input
            placeholder={"Nhập mật khẩu của bạn"}
            name="password"
            control={control}
            type="password"
            error={errors?.password}
          ></Input>
          {errors?.password && (
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="mb-2">Giới tính</Label>
          <RadioGroup
            defaultValue="male"
            name="gender"
            onChange={(e) => setValue("gender", e.target.value)}
            className="grid grid-cols-3 gap-x-5"
          >
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
            <div></div>
          </RadioGroup>
        </FormGroup>
        <div className="text-center">
          <ButtonGradient
            className="w-[60%] py-[14px] text-[22px] leading-9 font-semibold rounded-xl"
            type="submit"
            isLoading={isLoading}
            sizeLoading="36px"
          >
            Đăng Ký
          </ButtonGradient>
          <p className="mt-3 text-sm font-normal">
            Nếu bạn đã có tài khoản, bạn có thể{" "}
            <Link to={"/login"} className="font-medium text-primary">
              đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </Authentication>
  );
};

export default RegisterPage;
