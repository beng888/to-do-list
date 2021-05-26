import React from "react";

export default function Shadow({ open }) {
  return (
    <div
      className={`absolute inset-0 bg-black z-20 duration-500 pointer-events-none ${
        open ? "bg-opacity-60" : "bg-opacity-0"
      }`}
    />
  );
}
