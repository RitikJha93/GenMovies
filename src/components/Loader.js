import React from "react";
import loader from "./loading.gif";
export default function Loader() {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  return (
    <div className="loader" style={style}>
      <img src={loader} alt="" />
    </div>
  );
}
