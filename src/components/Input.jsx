import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="inline-block mb-1 pl-1 text-sm md:text-base font-medium"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
                text-sm md:text-base lg:text-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
