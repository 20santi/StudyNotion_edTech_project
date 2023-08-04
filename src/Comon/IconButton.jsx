import React from "react";

export default function IconButton({ children, text, customClass }) {
  return (
    <div>
      <button className={`${customClass}`}>{text}</button>
    </div>
  );
}
