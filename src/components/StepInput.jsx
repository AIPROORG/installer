import React from "react";

const StepInput = ({
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  onBlur,
  styleClass = "input-wizard",
}) => {
  const handleInputChange = (event) => {
    onChange?.(event);
  };

  return (
    <>
      <p className="step-p">{label}</p>
      <input
        className={styleClass}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </>
  );
};

export default StepInput;
