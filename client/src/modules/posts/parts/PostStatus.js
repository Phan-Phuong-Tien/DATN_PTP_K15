import React from "react";
import PropTypes from "prop-types";

const PostStatus = ({
  hoverColor = "",
  quantity = 0,
  children,
  onClick = () => {},
  title,
  className = "",
  textColor = "",
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer group gap-x-2 select-none text-text3 dark:text-text4 ${className}`}
      title={title}
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center transition-all rounded-full w-9 h-9 ${hoverColor} group-hover:bg-opacity-10`}
      >
        {children}
      </div>
      <span className={`text-sm ${textColor}`}>{quantity}</span>
    </div>
  );
};

PostStatus.propTypes = {
  hoverColor: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  children: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PostStatus;
