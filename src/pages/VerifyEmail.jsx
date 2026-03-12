import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function VerifyEmail(){

    const [params] = useSearchParams();
    const [message, setMessage] = useState("Verifying email...");
    const token = params.get("token");

    useEffect(() => {
        fetch(`http://192.168.0.104:4000/api/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
            setMessage("Email varified successfully");
        })
        .catch(() => { 
            setMessage("Invalid or expired verification link");
        });

    }, []);

    return(
        <div>
            <h2>{message}</h2>
        </div>
    );
}

export default VerifyEmail;