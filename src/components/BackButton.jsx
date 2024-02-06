import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ onPress, title = "BACK", styleClass }) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <div className={styleClass}>
      <button className="back-button" onClick={handlePress}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {title}
      </button>
    </div>
  );
};

export default BackButton;
