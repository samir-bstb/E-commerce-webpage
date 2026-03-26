import "../CSS/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async () => {
    setEmailError("");
    setError("");

    if (!email || !password){
      setError("All fields required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.104:4000/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok){
        setError(data.error || "Login Failed");
        
        if (data.error === "User not found") {
            setShowSignup(true);
        }

        return;
      }

      localStorage.setItem("token", data.token); //global token for authentication
      window.dispatchEvent(new Event("storage"));
      console.log("Login succesful");
      navigate("/");

    } catch (error) {
      setError("Server error");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Access your E-mart account</p>

        <p className="label">Email</p>
        <input 
          type="email" 
          placeholder="Email" 
          value ={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}

        <p className="label">Password</p>
        <div className="password-field">
          <input 
            type={showPwd ? "text" : "password" }
            placeholder="Password" 
            value={password}
            onChange ={(e) => setPassword(e.target.value)}
          />

          <i 
            className = {showPwd ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
            onClick={() => setShowPwd(!showPwd)}
          ></i>
        </div>
    
        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}> Log in </button>

        {showSignup && (
          <div>
            <p className="accountEror">No account with email: {email} found.</p>
            <a href="/signin">Create account</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
