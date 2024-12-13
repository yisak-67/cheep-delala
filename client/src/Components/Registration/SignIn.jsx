import react, { useContext } from "react";
import "./SignIn.css";
import UserInput from "./UserInput";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginStatusContext } from "../../App";

function SignIn() {
  const navigate = useNavigate();

  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);

  function handleCommit(event) {
    event.preventDefault();

    const emailVal = event.target.elements.inputedEmail.value;
    const passwordVal = event.target.elements.inputedPassword.value;

    const tobeCheckedInfo = {
      email: emailVal,
      password: passwordVal,
    };

    if (
      tobeCheckedInfo.email.length > 5 &&
      tobeCheckedInfo.password.length >= 8
    ) {
      abiCall(tobeCheckedInfo)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            console.log(response);
            loginStatusHandler(response.data);
            navigate("/");
          } else {
            console.log("this is a work hard news");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("less than minimum allowed digit for password");
    }
  }

  const abiCall = (sendingInput) => {
    const server = "http://localhost:8080";
    console.log(sendingInput);

    return axios
      .post(`${server}/login`, sendingInput)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("Error: ", error);
        throw error;
      });
  };

  return (
    <div className="signin-container">
      <div className="signin">
        <h2 className="temp">Sign in</h2>
        <form onSubmit={handleCommit}>
          <div className="sign-in-input">
            <UserInput
              placeHol="Enter Email"
              type="email"
              name="inputedEmail"
            />
            <UserInput
              placeHol="Enter Password"
              type="password"
              name="inputedPassword"
            />
          </div>
          <button className="com-btn">Commit</button>
        </form>

        <Link to="/signup">
          <div className="back-to-register">
            <strong>back to sign up</strong>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
