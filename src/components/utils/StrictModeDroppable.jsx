import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }) => {
  const [endabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!endabled) return null;
  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;
