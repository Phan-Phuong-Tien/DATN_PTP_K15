import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Authentication from "layout/Authentication";
import FormGroup from "components/form/FormGroup";
import Label from "components/form/Label";
import Input from "components/form/Input";
import ErrorMessage from "components/form/ErrorMessage";
import ButtonGradient from "components/button/ButtonGradient";
import { forgotPassword } from "redux/auth/authRequest";

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email của bạn!")
    .email("Email này không đúng cú pháp!"),
});

const ForgotPassPage = () => {
  const navigate = useNavigate();
  const [isRequestSent, setIsRequestSent] = useState(false);
  
  useEffect(() => {
    document.title = "Quên mật khẩu | FreshConnect";
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const handleForgotPassword = async (values) => {
    try {
      await dispatch(forgotPassword({ email: values.email }));
      setIsRequestSent(true);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi gửi yêu cầu khôi phục mật khẩu:", error);
    }
  };

  return (
    <Authentication heading="Quên mật khẩu">
      {!isRequestSent ? (
        <form
          className="flex flex-col gap-y-5"
          autoComplete="off"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <FormGroup className="mb-4">
            <Label className="mb-3" name="email">
              Email *
            </Label>
            <Input
              defaultValue=""
              placeholder="name@gmail.com"
              type="email"
              control={control}
              name="email"
              error={isDirty && errors?.email}
            />
            {errors?.email && (
              <ErrorMessage className="-bottom-1">
                {errors?.email?.message}
              </ErrorMessage>
            )}
          </FormGroup>
          <div className="mt-8 text-center">
            <ButtonGradient
              className="w-[60%] py-[14px] text-[22px] leading-9 font-semibold rounded-xl"
              type="submit"
            >
              Gửi yêu cầu
            </ButtonGradient>
            <p className="mt-4 text-sm font-normal">
              Bạn đã nhớ lại mật khẩu?{" "}
              <Link to={"/login"} className="font-medium text-primary">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-lg font-semibold text-primary mb-4">
            Yêu cầu đã được gửi
          </p>
          <p className="text-sm font-normal">
            Chúng tôi đã gửi một email chứa hướng dẫn khôi phục mật khẩu của
            bạn. Vui lòng kiểm tra hòm thư của bạn và làm theo hướng dẫn.
          </p>
          <p className="mt-3 text-sm font-normal">
            Quay trở lại{" "}
            <Link to={"/login"} className="font-medium text-primary">
              đăng nhập
            </Link>
          </p>
        </div>
      )}
    </Authentication>
  );
};

export default ForgotPassPage;
