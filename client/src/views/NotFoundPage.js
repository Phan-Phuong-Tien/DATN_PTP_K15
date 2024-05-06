import ButtonGradient from "components/button/ButtonGradient";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.pathname === "/") navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-lite flex flex-col items-center justify-center gap-y-2 h-[100vh]">
      <img src="/img/404-error.png" alt="" className="w-[150px]" />
      <h3 className="text-3xl font-bold tracking-wide text-text1">
        Page not found
      </h3>
      <div className="text-center">
        <p className="text-text3">
          This page doesn't exist or an other error occurred.
        </p>
        <p className="text-text3">Click button below to go back home page.</p>
      </div>
      <ButtonGradient
        onClick={() => navigate("/home")}
        theme={2}
        className="w-[200px] py-5 mt-4 rounded-lg text-base font-bold"
      >
        Go Home Page
      </ButtonGradient>
    </div>
  );
};

export default NotFoundPage;
