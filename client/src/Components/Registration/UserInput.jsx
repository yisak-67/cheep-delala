import "./UserInput.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";

function UserInput({ style, name, type, placeHol }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="user-input">
      <input
        name={name}
        type={showPassword ? "text" : type}
        style={style}
        placeholder={placeHol}
      />

      <span onClick={handleTogglePassword}>
        {name === "passwordInput" || name === "confirmInput" ? (
          showPassword ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )
        ) : null}
      </span>
    </div>
  );
}

export default UserInput;
