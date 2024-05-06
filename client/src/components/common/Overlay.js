import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Overlay = ({ children, handleHideModal, alignCenter = false }) => {
  useEffect(() => {
    document.body.classList.add("hide-scroll");

    return () => document.body.classList.remove("hide-scroll");
  }, []);
  return (
    <div
      className={`fixed inset-0 z-[9999] max-h-[100vh] p-10 scroll-hidden ${
        alignCenter && "flex items-center"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-70 -z-10"
        onClick={handleHideModal}
      ></div>
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node,
};

export default Overlay;
