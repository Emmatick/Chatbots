import React from "react";
import chatLogo from "../assets/chatLogo.png";
const Logo = () => {
  return (
    <div className="logo h-16 w-16">
      <img src={chatLogo} alt="logo" />
    </div>
  );
};

export default Logo;
