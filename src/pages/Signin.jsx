import "../CSS/Signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    const handleSignin = async () => {
        setError("");
        setEmailError("");

        if (!email || !password || !confirmPassword){
            setError("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            return;
        }

        if (password !== confirmPassword) {
            setError("*Password and Confirm Password do not match");
            return;
        } 

        try {
            const res = await fetch("http://192.168.0.104:4000/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"}, //Le dice al servidor que el body está en formato JSON
                body: JSON.stringify({ //Convierte el objeto en JSON
                    email,
                    password
                })
            });

            const data = await res.json(); //Convierte la respuesta del backend en objeto JavaScript

            if (!res.ok) {
                setError(data.error || "Sigin Failed");
                return;
            }

            localStorage.setItem("token", data.token); //Guarda el JWT en el navegador
            console.log("Signin succesful");
            navigate("/login");
        } catch (error) {
            setError("Server Error");
        }
    };

    return(
        <div className="signin-container">
            <div className="signin-card">
                <h1>Sign in</h1>
                <p>Create your E-mart account</p>
                <p className="label">Email</p>
                <input 
                    type="email"
                    placeholder="Email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error">{emailError}</p>}

                <p className="label">Password</p>
                <div className="password-field">
                    <input 
                        type={showPwd ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <i
                        className={showPwd ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                        onClick={() => setShowPwd(!showPwd)}
                    ></i>
                </div>

                <p className="label">Confirm Password</p>
                <div className="password-field">
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        value = {confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i
                        className={showConfirmPwd ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                        onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    ></i>
                </div>
                
                {error && <p className="error">{error}</p>}

                <button onClick={handleSignin}>Sign in</button>
                
            </div>
        </div>
    );
}

export default Signin;