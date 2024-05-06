import { useState } from "react";

export default function useToggle(value = false) {
  const [show, setShow] = useState(value);

  const handleToggle = () => {
    setShow((show) => !show);
  };

  return [show, handleToggle];
}
