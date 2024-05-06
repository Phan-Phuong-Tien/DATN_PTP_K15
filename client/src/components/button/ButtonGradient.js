import React from "react";
import PropTypes from "prop-types";
import LoadingSpin from "components/loading/LoadingSpin";
import { Button, CircularProgress } from "@mui/material";

const ButtonGradient = ({
  className,
  children,
  onClick = () => {},
  type = "button",
  theme = 1,
  isLoading = false,
  sizeLoading = "24px",
}) => {
  switch (theme) {
    case 1:
      className += " from-thirdColor to-primary";
      break;

    case 2:
      className += " from-thirdColor to-secondary";
      break;
    default:
      break;
  }
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-r duration-200 ${className} select-none transition-all ${
        isLoading && "pointer-events-none opacity-40"
      }`}
    >
      {isLoading ? (
        <CircularProgress
          style={{ width: sizeLoading, height: sizeLoading, color: "white" }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

ButtonGradient.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.number,
};

export default ButtonGradient;
