import React, { useId, forwardRef } from "react";

function Input(
  {
    label,
    textColor = "text-gray-800",
    type = "text",
    className = "",
    labelClass = "",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        {label ? (
          <label
            htmlFor={id}
            className={`inline-block font-semibold ${labelClass}`}
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`w-full rounded-lg  p-2 ${className} ${textColor}`}
          {...props}
        />
      </div>
    </>
  );
}

export default forwardRef(Input); //when exporting wrap it inside forwardRef.
