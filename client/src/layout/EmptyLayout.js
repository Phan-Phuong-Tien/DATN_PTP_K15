import React from "react";
import TextHeading from "components/text/TextHeading";
import TextLight from "components/text/TextLight";
import PropTypes from "prop-types";

const EmptyLayout = ({ linkImg, className, info, support, children }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 gap-y-4 ${className}`}
    >
      <img src={linkImg} className="w-[90px] h-[90px]" alt="" />
      <div className="text-center">
        <TextHeading className="text-lg">{info}</TextHeading>
        <TextLight>{support}</TextLight>
        {children}
      </div>
    </div>
  );
};

EmptyLayout.propTypes = {
  linkImg: PropTypes.string,
  className: PropTypes.string,
  info: PropTypes.string,
  support: PropTypes.string,
};

export default EmptyLayout;
