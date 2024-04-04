import { Checkbox } from "@material-ui/core";
import "./index.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../CustomAPIs/customposthook";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("userid");
    console.log(userId, "login ");
    if (userId) {
      navigate("/");
    }
  }, []);

  const submitLoginDetails = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validation
    if (!login || !password) {
      setError("Username and password are required.");
      return;
    }

    // If validation passes, continue with form submission
    try {
      const loginData = {
        email_or_mobile: login,
        password: password,
      };

      const { responseData } = await postData("login", loginData);

      if (responseData.status == true) {
        Cookies.set("userid", responseData.user_id);

        setLogin("");
        setPassword("");
        navigate("/");
      } else {
        alert("Please enter valid credentials");
      }
    } catch (error) {
      console.error("Error submitting login details:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page-main-container">
      <form className="login-page-container1" onSubmit={submitLoginDetails}>
        <h4 className="login-page-heading">Login</h4>
        <div className="login-page-input-container">
          <label className="login-page-label">
            Username or email address *
          </label>
          <input
            className="login-page-input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="login-page-input-container">
          <label className="login-page-label">Password *</label>
          <input
            type="password"
            className="login-page-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="login-page-checkbox-container">
          <Checkbox className="login-page-checkbox" />
          <label className="login-page-label">Remember me</label>
        </div>
        <button className="login-page-button" type="submit">
          Login
        </button>
        <div>
          {" "}
          <p className="login-page-text1 login-page-text">
            Lost your Password?
          </p>
          <p
            className="login-page-dont-have-an-account"
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
