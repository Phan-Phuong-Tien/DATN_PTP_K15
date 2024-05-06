import React from "react";
import PropTypes from "prop-types";

const FormGroup = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col relative ${className}`}>{children}</div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FormGroup;
