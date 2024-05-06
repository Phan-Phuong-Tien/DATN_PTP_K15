import React from "react";
import useToggle from "hooks/useToggle";
import useSnackbarInfo from "hooks/useSnackbarInfo";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import axios from "api/config";
import Cookies from "js-cookie";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PostSaved = ({ isSaved = false, postID = "" }) => {
  const [saved, setSaved] = useToggle(isSaved);
  const { action, handleClose, stateOpen } = useSnackbarInfo();

  const [open, setOpen] = stateOpen;
  const handleSaved = async () => {
    try {
      setSaved();
      await axios({
        method: "POST",
        url: "/posts/saved/" + postID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon className="text-iconColor" />}
        checkedIcon={<BookmarkIcon className="text-primary" />}
        checked={saved}
        className="dark:hover:bg-slate-700"
        onChange={handleSaved}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={saved ? "Đã thêm vào danh sách lưu" : "Đã xóa khỏi danh sách lưu"}
        action={action}
      />
    </>
  );
};

PostSaved.propTypes = {
  isSaved: PropTypes.bool,
};

export default PostSaved;
