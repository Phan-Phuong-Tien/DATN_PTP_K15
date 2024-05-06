import React, { useEffect } from "react";
import { Button, CircularProgress, TextareaAutosize } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "redux/comments/commentRequest";

const CommentForm = ({ postID = "", emitTyping, emitStopTyping }) => {
  const dispatch = useDispatch();
  const {
    register,
    reset,
    watch,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const { loading, error } = useSelector((state) => state.comments.addComment);
  const content = watch("content");
  const handleComment = (values) => {
    dispatch(addNewComment({ postID, content: values.content.trim() }));
    reset({ content: "" });
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (content?.length > 0) {
        emitTyping();
      }
    }, 3000);

    const timer2 = setTimeout(() => {
      emitStopTyping();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <form
      onSubmit={handleSubmit(handleComment)}
      className="flex flex-col flex-1"
    >
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Bình luận câu trả lời của bạn về bài viết này"
        autoFocus={true}
        className="px-4 py-3 transition-all bg-transparent border text-text2 dark:text-white rounded-xl border-strock dark:border-gray-600 focus:border-primary"
        {...register("content", { required: true })}
      />
      <div className="my-3 text-right">
        <Button
          variant="contained"
          type="submit"
          className={`w-[100px] bg-primary rounded-full py-[6px] transition-all ${
            loading && "pointer-events-none bg-opacity-30"
          } ${
            (!isDirty || errors?.content) && "pointer-events-none opacity-30"
          }`}
        >
          {loading ? (
            <CircularProgress
              style={{ width: "25px", height: "25px" }}
              className="text-text1 dark:text-whiteSoft2 opacity-80"
            />
          ) : (
            "Trả lời"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
