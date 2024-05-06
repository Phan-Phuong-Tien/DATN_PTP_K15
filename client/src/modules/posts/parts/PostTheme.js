import React from "react";
import parse from "html-react-parser";

const PostTheme = ({ children, theme }) => {
  return (
    <>
      {theme.linkImg ? (
        <div
          style={{
            backgroundImage: `url(${theme?.linkImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="h-[400px] overflow-auto scroll-custom flex items-center justify-center p-5 mt-2 rounded-lg"
        >
          <h3
            className={`text-[34px] font-bold leading-[50px] text-center ${theme?.textColor}`}
          >
            {parse(children)}
          </h3>
        </div>
      ) : (
        <div className="pb-4 max-h-[400px] overflow-auto scroll-custom">
          <h3
            className={`text-[26px] font-medium leading-8 text-text1 dark:text-white`}
          >
            {parse(children)}
          </h3>
        </div>
      )}
    </>
  );
};

export default PostTheme;
