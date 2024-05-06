import React from "react";
import PropTypes from "prop-types";
import { Switch } from "@mui/material";

const FilterSwitch = ({ label, checked, handleChange }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[15px] text-text2">{label}</p>
      <Switch checked={checked} onChange={handleChange} size="small" />
    </div>
  );
};

FilterSwitch.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
};

export default FilterSwitch;
