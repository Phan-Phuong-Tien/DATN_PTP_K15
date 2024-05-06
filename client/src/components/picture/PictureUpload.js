import React from "react";

const PictureUpload = ({
  children,
  className,
  control,
  name,
  onChange,
  ...props
}) => {
  return (
    <label className={className + " cursor-pointer"}>
      <input
        type="file"
        name={name}
        className="hidden"
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  );
};

export default PictureUpload;
