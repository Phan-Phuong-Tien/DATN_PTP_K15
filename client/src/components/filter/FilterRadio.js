import React from "react";
import PropTypes from "prop-types";
import { Radio } from "@mui/material";
import TextUsername from "components/text/TextUsername";

const FilterRadio = ({
  selectedValue,
  handleChange,
  className = "",
  value = "",
  label = "",
}) => {
  return (
    <label
      id="filter-radio"
      className={`flex items-center justify-between cursor-pointer ${className}`}
    >
      <TextUsername>{label}</TextUsername>
      <Radio
        checked={selectedValue === value}
        onChange={handleChange}
        value={value}
        name="filter-radio"
        className="p-[6px]"
      />
    </label>
  );
};

FilterRadio.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default FilterRadio;
