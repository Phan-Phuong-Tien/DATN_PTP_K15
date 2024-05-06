import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";

const FilterCheckbox = ({
  label,
  handleChange = () => {},
  checked = false,
}) => {
  return (
    <label
      id="filter-checkbox"
      className="flex items-center justify-between cursor-pointer"
    >
      <p className="text-[15px] text-text2">{label}</p>
      <Checkbox
        aria-label="checkbox-demo"
        checked={checked}
        name="filter-checkbox"
        onChange={handleChange}
        size="small"
        // className="text-iconColor checked:text-primary"
      />
    </label>
  );
};

FilterCheckbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
};

export default FilterCheckbox;
