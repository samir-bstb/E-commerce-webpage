import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function VerifyEmail(){

    const [params] = useSearchParams();
    const [message, setMessage] = useState("Verifying email...");
    const [status, setStatus] = useState("loading");

    const token = params.get("token");
    const executed = useRef(false);

    useEffect(() => {

        if (executed.current) return;
        executed.current = true;

        if (!token) {
            setStatus("error");
            setMessage("Invalid verification link");
            return;
        }

        const verify = async () => {
            try {

                const res = await fetch(
                    `http://192.168.0.104:4000/api/auth/verify-email?token=${token}`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Verification failed");
                }

                setStatus("success");
                setMessage("Email verified successfully");
                setTimeout(() => {
                    setMessage("Email verified successfully");
                }, 2500);

                setTimeout(() => {
                    setMessage("You can close this window now.");
                }, 2500);

            } catch (error) {

                setStatus("error");
                setMessage(error.message || "Invalid or expired verification link");

            }
        };

        verify();

    }, [token]);

    return(
        <div>
            <h2>{message}</h2>
        </div>
    );
}

export default VerifyEmail;