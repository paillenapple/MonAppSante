import React from "react";
import classNames from "classnames";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = ({ className, color, height, type, width }) => {
  const divClassName = classNames("flex-row-c flex-1", className);
  return (
    <div className={divClassName}>
      <Spinner color={color} height={height} type={type} width={width} />
    </div>
  );
};

Loader.defaultProps = {
  color: "hsl(93, 7%, 10%)",
  height: 100,
  type: "RevolvingDot",
  width: 100,
};

export default Loader;
