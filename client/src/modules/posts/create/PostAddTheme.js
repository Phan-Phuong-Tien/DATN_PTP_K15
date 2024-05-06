import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addNewPost } from "redux/posts/postRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { listTheme } from "utils/constant";
import ButtonGradient from "components/button/ButtonGradient";
import { useNavigate } from "react-router-dom";

const PostAddTheme = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      content: "",
      theme: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchTheme = watch("theme");
  const { loading } = useSelector((state) => state.posts.createPost);
  const handleAddPost = async (value) => {
    const data = {
      ...value,
      type: "theme",
    };
    dispatch(addNewPost({ data, navigate, reset }));
  };
  return (
    <form onSubmit={handleSubmit(handleAddPost)} className="mt-3">
      <div className="relative min-h-[200px]">
        {!watchTheme ? (
          <textarea
            className="w-full min-h-[140px] text-xl font-medium scroll-custom bg-transparent"
            placeholder={`Hi ${currentUser?.firstName}, bạn đang nghĩ gì vậy?`}
            {...register("content")}
          ></textarea>
        ) : (
          <div className="relative w-full max-h-[300px] overflow-hidden rounded-xl scroll-custom">
            <img src={watchTheme?.linkImg} alt="" />
            <textarea
              className={`absolute w-full min-h-[220px] scroll-custom p-4 text-xl font-medium text-center bg-transparent top-5 placeholder:text-text4 ${watchTheme?.textColor}`}
              placeholder={`Hi ${currentUser?.firstName}, bạn đang nghĩ gì vậy?`}
              {...register("content")}
            ></textarea>
          </div>
        )}
        <div className="absolute left-0 w-full px-5 bottom-2">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            className="swiper-theme"
          >
            <SwiperSlide>
              <div
                className={`h-10 rounded-md cursor-pointer bg-graySoft dark:bg-gray-700 ${
                  !watchTheme && "theme-active"
                }`}
                onClick={(e) => setValue("theme", "")}
              ></div>
            </SwiperSlide>
            {listTheme.map((theme, i) => (
              <SwiperSlide key={i}>
                <img
                  src={theme.linkImg}
                  className={`object-cover w-full h-10 rounded-md cursor-pointer ${
                    watchTheme.linkImg === theme.linkImg && "theme-active"
                  }`}
                  alt=""
                  onClick={(e) => setValue("theme", theme)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <ButtonGradient
        type="submit"
        isLoading={loading}
        className={`w-full py-3 mt-4 text-base font-bold rounded-md ${
          !watch("content") && "pointer-events-none opacity-40"
        }`}
      >
        Đăng
      </ButtonGradient>
    </form>
  );
};

export default PostAddTheme;
