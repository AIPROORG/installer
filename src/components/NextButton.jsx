import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

const NextButton = ({
  onPress,
  title = "NEXT",
  type,
  styleClass = "input-next",
}) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <button className={styleClass} type={type} onClick={handlePress}>
      {title} <FontAwesomeIcon icon={faAngleDoubleRight} />
    </button>
  );
};

export default NextButton;
