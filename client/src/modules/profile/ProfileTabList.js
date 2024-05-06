import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

const ProfileTabList = ({ children, listTab = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState(
    searchParams.get("tab") || "picture"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchParams({ tab: newValue });
  };
  return (
    <div className="w-full mt-5">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {listTab.map((tab, i) => (
          <Tab
            value={tab}
            label={tab}
            key={i}
            className="capitalize transition-all rounded-sm hover:bg-graySoft hover:dark:bg-darkSoft"
          />
        ))}
      </Tabs>
      <div className="w-full h-[1px] bg-graySoft dark:bg-gray-800"></div>
      {children}
    </div>
  );
};

ProfileTabList.propTypes = {
  children: PropTypes.node,
  listTab: PropTypes.array.isRequired,
  setSearchParams: PropTypes.any,
};

export default ProfileTabList;
