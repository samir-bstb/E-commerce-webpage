import "../CSS/CheckEmail.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function CheckEmail() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const email = location.state?.email;

    const handleResend = async() => {
        setLoading(true);
        setMessage("");

        try {
            if (!email) {
                setMessage("Email not found");
                return;
            }

            const res = await fetch ("http://192.168.0.104:4000/api/auth/resend-verification", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                }) 
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || "Something went wrong");
                return;
            }

            setMessage(data.message);
        } catch (error) {
            setMessage("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-check-page">
            <div className="verify-check-container">
                <h1>Check your email</h1>
                <p>We sent you a verification link.</p>
                <p>Please verify your account to continue.</p>

                <button onClick={handleResend} disabled={loading}>
                    {loading ? "Sending..." : "Resend email"}
                </button>

                {message && <p className="info">{message}</p>}
            </div>
        </div>
    );
}

export default CheckEmail;