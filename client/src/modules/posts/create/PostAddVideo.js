import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import ButtonGradient from "components/button/ButtonGradient";
import PictureUpload from "components/picture/PictureUpload";
import CloseIcon from "@mui/icons-material/Close";
import { addNewPost } from "redux/posts/postRequest";
import { useNavigate } from "react-router-dom";

const PostAddVideo = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      content: "",
      videoUpload: null,
    },
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts.createPost);
  const navigate = useNavigate();
  const [loadPreview, setLoadPreview] = useState(false);
  const [preview, setPreview] = useState(null);
  const watchVideoUpload = watch("videoUpload");
  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file.type.split("/")[0] === "video") {
      var url = URL.createObjectURL(file);
      setLoadPreview(true);
      setValue("videoUpload", file);
      setTimeout(() => {
        setPreview(url);
        setLoadPreview(false);
      }, 3000);
    }
  };
  const handleDeleteFile = () => {
    setValue("videoUpload", null);
    setPreview(null);
  };
  const handlePostVideo = (values) => {
    const data = {
      ...values,
      type: "video",
    };
    dispatch(addNewPost({ data, navigate, reset }));
    setPreview(null);
  };
  return (
    <form onSubmit={handleSubmit(handlePostVideo)} className="mt-3 select-none">
      <div className="max-h-[60vh] overflow-auto scroll-custom">
        <TextareaAutosize
          aria-label="empty textarea"
          minRows={2}
          maxRows={6}
          placeholder={`Hi ${currentUser?.firstName}, bạn đang nghĩ gì vậy?`}
          className="w-full mb-8 overflow-auto text-base font-normal bg-transparent scroll-custom"
          {...register("content")}
        />
      </div>
      {preview ? (
        <div className="relative">
          <video className="w-full min-h-[220px]" autoPlay loop>
            <source src={preview} />
          </video>
          <div
            className={`absolute flex items-center justify-center w-8 h-8 transition-all rounded-full cursor-pointer bg-graySoft opacity-60 right-4 top-4 ${
              loadPreview && "hidden"
            } hover:opacity-90`}
            onClick={handleDeleteFile}
          >
            <CloseIcon className="text-xl text-text2" />
          </div>
        </div>
      ) : (
        <PictureUpload
          className={`h-[220px] flex flex-col justify-center bg-whiteSoft dark:bg-gray-700 items-center rounded-lg ${
            loadPreview && "pointer-events-none"
          } hover:bg-graySoft hover:dark:bg-gray-600`}
          name="videoUpload"
          onChange={handleSelectFile}
          multiple={false}
          control={control}
        >
          {loadPreview ? (
            <div className="bg-transparent border-4 rounded-full w-14 h-14 border-secondary border-t-transparent animate-spin"></div>
          ) : (
            <>
              <img src="/img/video.png" className="mb-3 w-14 h-14" alt="" />
              <h3 className="text-text3">Ấn để chọn file video</h3>
            </>
          )}
        </PictureUpload>
      )}
      <ButtonGradient
        type="submit"
        isLoading={loading}
        className={`w-full py-3 mt-4 text-base font-bold rounded-md ${
          !isDirty && !watchVideoUpload && "pointer-events-none opacity-40"
        }`}
      >
        Đăng
      </ButtonGradient>
    </form>
  );
};

export default PostAddVideo;
