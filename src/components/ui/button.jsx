import * as React from "react";

export default function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={
        "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium " +
        "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 " +
        className
      }
    >
      {children}
    </button>
  );
}
