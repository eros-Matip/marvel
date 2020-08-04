import React from "react";

const Footer = (props) => {
  return (
    <div className="footer">
      <p className="p-footer">
        Made with <strong>{props.app} </strong>at{" "}
        <strong>{props.school}</strong> by <strong>{props.name}</strong>
      </p>
    </div>
  );
};
export default Footer;
