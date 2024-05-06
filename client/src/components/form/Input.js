import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Input = ({
  placeholder,
  type = "text",
  className = "",
  control,
  error = null,
  name,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={name}
      className={`w-full px-5 py-4 transition-all bg-transparent border rounded-lg ${
        error
          ? "border-errorColor bg-red-50 dark:bg-red-400 dark:bg-opacity-10"
          : "border-strock dark:border-gray-600 focus:border-primary focus:dark:border-primary"
      }${className}`}
      {...field}
      {...props}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
};

export default Input;
