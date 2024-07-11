import React from "react";

function Button({ title, onClick, variant, disabled, fullWidth, type }) {
  let className = "bg-primary p-1 text-grey ";
  if (fullWidth) {
    className += " w-full";
  }
  if (variant === "outlined") {
    className = className.replace("bg-primary", "border border-primary");
  }
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
