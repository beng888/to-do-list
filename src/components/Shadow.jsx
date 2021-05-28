import React from "react";

export default function Shadow({ open, close }) {
  return (
    <div
      onClick={() => close()}
      className={`absolute inset-0 bg-black z-20 duration-500  ${
        open ? "bg-opacity-60" : "bg-opacity-0 pointer-events-none"
      }`}
    />
  );
}
