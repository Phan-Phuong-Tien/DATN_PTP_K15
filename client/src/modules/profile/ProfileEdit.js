import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Overlay from "components/common/Overlay";
import ModalHeading from "components/modal/ModalHeading";
import PictureAvatarBig from "components/picture/PictureAvatarBig";
import PictureCover from "components/picture/PictureCover";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PictureUpload from "components/picture/PictureUpload";
import ButtonGradient from "components/button/ButtonGradient";
import FormGroup from "components/form/FormGroup";
import Label from "components/form/Label";
import Input from "components/form/Input";
import { TextareaAutosize } from "@mui/material";
import Dropdown from "components/dropdown/Dropdown";
import ModalLine from "components/modal/ModalLine";
import { updateUserProfile } from "../../redux/users/userRequest";
import { useDispatch, useSelector } from "react-redux";
import DropdownItem from "components/dropdown/DropdownItem";
import { useState } from "react";
import ErrorMessage from "components/form/ErrorMessage";
import convertLineBreak from "utils/convertLineBreak";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Đây là trường bắt buộc")
    .min(2, "Tên có ít nhất 2 ký tự"),
  lastName: yup
    .string()
    .required("Đây là trường bắt buộc")
    .min(2, "Họ có ít nhất 2 ký tự"),
  desc: yup.string().max(150),
  workAt: yup.string().max(50),
});

const ProfileEdit = ({ handleHideModal = () => {}, setOpenSnackbar }) => {
  const {
    userInfo: { avatar, coverImg, firstName, lastName, detailInfo, _id },
    loading,
  } = useSelector((state) => state.users.profile);
  const date = detailInfo?.birthday.split("/") || [];
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName,
      lastName,
      desc: "",
      day: date.length === 0 || date[0] === "dd" ? "" : date[0],
      month: date.length === 0 || date[1] === "mm" ? "" : date[1],
      year: date.length === 0 || date[2] === "yy" ? "" : date[2],
      workAt: detailInfo?.workAt || "",
    },
  });
  const dispatch = useDispatch();
  const watchDesc = watch("desc");
  const [preview, setPreview] = useState({
    avatar: null,
    coverImg: null,
  });
  const handleSelectedFile = (e) => {
    const file = e.target.files[0];
    const name = e.target.getAttribute("name");
    let image = URL.createObjectURL(file);
    setValue(name, file);
    setPreview({
      ...preview,
      [name]: image,
    });
  };
  const handleEditProfile = (values) => {
    const { day, month, year, ...others } = values;
    const data = {
      ...others,
      desc: values.desc ? convertLineBreak(values.desc) : "",
      birthday: `${day || "dd"}/${month || "mm"}/${year || "yy"}`,
    };

    dispatch(updateUserProfile({ data, userID: _id, dispatch }));
    setOpenSnackbar(true);
  };
  return (
    <Overlay handleHideModal={handleHideModal} alignCenter={true}>
      <div className="w-[600px] mx-auto bg-white dark:bg-darkSoft z-50 rounded-xl show-modal">
        <ModalHeading handleHideModal={handleHideModal}>
          Chỉnh sửa trang cá nhân
        </ModalHeading>
        <ModalLine />
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <div className="max-h-[500px] overflow-auto">
            <div className="relative">
              <PictureCover src={preview.coverImg || coverImg}>
                <div className="absolute inset-0 flex items-center bg-black bg-opacity-25">
                  <PictureUpload
                    className="flex items-center justify-center w-12 h-12 mx-auto transition-all bg-black bg-opacity-50 rounded-full hover:bg-opacity-40"
                    control={control}
                    name="coverImg"
                    onChange={handleSelectedFile}
                  >
                    <CameraAltOutlinedIcon className="text-white" />
                  </PictureUpload>
                </div>
              </PictureCover>
              <PictureAvatarBig
                avatar={preview.avatar || avatar}
                alt="avatar"
                className="absolute bottom-0 p-1 left-5 translate-y-2/4"
                size={110}
              >
                <div className="absolute inset-0 flex items-center bg-black bg-opacity-25 rounded-full cursor-default">
                  <PictureUpload
                    className="flex items-center justify-center w-10 h-10 mx-auto transition-all bg-black bg-opacity-50 rounded-full hover:bg-opacity-40"
                    control={control}
                    name="avatar"
                    onChange={handleSelectedFile}
                  >
                    <CameraAltOutlinedIcon className="text-white" />
                  </PictureUpload>
                </div>
              </PictureAvatarBig>
            </div>
            <div className="flex flex-col px-5 mt-16 gap-y-4">
              <div className="grid grid-cols-2 gap-x-6">
                <FormGroup>
                  <Label name="firstName" className="mb-2 text-[15px]">
                    Tên
                  </Label>
                  <Input
                    control={control}
                    name="firstName"
                    placeholder="This is required field"
                    error={errors?.firstName}
                    className="text-[15px]"
                  ></Input>
                  {errors?.firstName && (
                    <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label name="lastName" className="mb-2 text-[15px]">
                    Họ
                  </Label>
                  <Input
                    control={control}
                    name="lastName"
                    placeholder="This is required field"
                    error={errors?.lastName}
                    className="text-[15px]"
                  ></Input>
                  {errors?.lastName && (
                    <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
                  )}
                </FormGroup>
              </div>
              <FormGroup>
                <div className="flex items-center justify-between mb-2">
                  <Label name="desc" className="text-[15px]">
                    Miêu tả
                  </Label>
                  <span
                    className={`text-sm font-normal ${
                      watchDesc?.length > 150
                        ? "text-errorColor"
                        : "text-text3 dark:text-text4"
                    } `}
                  >
                    {watchDesc?.length || 0}/150
                  </span>
                </div>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Hãy mô tả cho chính mình!"
                  className="w-full px-5 py-4 transition-all bg-transparent border border-strock dark:border-gray-600 rounded-xl focus:border-primary focus:dark:border-primary text-[15px]"
                  name="desc"
                  minRows={3}
                  maxRows={10}
                  {...register("desc")}
                />
              </FormGroup>
              <FormGroup>
                <Label className="mb-2 text-[15px]">Sinh Nhật</Label>
                <div className="grid grid-cols-3 gap-x-4">
                  <Dropdown label="Ngày" value={watch("day")}>
                    {Array(31)
                      .fill()
                      .map((item, i) => (
                        <DropdownItem
                          key={i + 1}
                          value={i + 1}
                          className="text-sm text-text1"
                          onClick={() => setValue("day", i + 1)}
                        >
                          {i + 1}
                        </DropdownItem>
                      ))}
                  </Dropdown>
                  <Dropdown label="Tháng" value={watch("month")}>
                    {Array(12)
                      .fill()
                      .map((item, i) => (
                        <DropdownItem
                          key={i + 1}
                          value={i + 1}
                          className="text-sm text-text1"
                          onClick={() => setValue("month", i + 1)}
                        >
                          {i + 1}
                        </DropdownItem>
                      ))}
                  </Dropdown>
                  <Dropdown label="Năm" value={watch("year")}>
                    {Array(2022)
                      .fill()
                      .map(
                        (item, i) =>
                          i + 1 > 1970 && (
                            <DropdownItem
                              value={i + 1}
                              key={i + 1}
                              className="text-sm text-text1"
                              onClick={() => setValue("year", i + 1)}
                            >
                              {i + 1}
                            </DropdownItem>
                          )
                      )}
                  </Dropdown>
                </div>
              </FormGroup>
              <FormGroup>
                <Label className="mb-2 text-[15px]" name="workAt">
                  Làm Việc
                </Label>
                <Input
                  name="workAt"
                  placeholder="Nơi làm việc/học tập"
                  className="text-[15px]"
                  control={control}
                  error={errors?.workAt}
                ></Input>
                {errors?.workAt && (
                  <ErrorMessage>{errors.workAt?.message}</ErrorMessage>
                )}
              </FormGroup>
            </div>
          </div>
          <div className="my-5 text-center">
            <ButtonGradient
              className={`w-[200px] py-4 rounded-xl font-bold text-base ${
                !preview.avatar &&
                !preview.coverImg &&
                !isDirty &&
                "opacity-30 pointer-events-none"
              } transition-all`}
              type="submit"
              isLoading={loading}
            >
              Cập Nhật
            </ButtonGradient>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default ProfileEdit;
