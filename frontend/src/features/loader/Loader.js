import React from "react";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = ({ className, color, height, type, width }) => {
  return (
    <div className={className}>
      <Spinner color={color} height={height} type={type} width={width} />
    </div>
  );
};

Loader.defaultProps = {
  color: "hsl(0, 0%, 17%)",
  height: 100,
  type: "Oval",
  width: 100,
};

export default Loader;
