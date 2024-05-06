import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTurnSwitch(key, except = "") {
  const [searchParams, setSearchParams] = useSearchParams("");
  const keyName = searchParams.get(key);
  const [switchTab, setSwitchTab] = useState(-1);
  useEffect(() => {
    if (keyName === except) {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
    setSwitchTab((turn) => turn - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyName]);
  return { switchTab, searchParams, setSearchParams, keyName };
}
