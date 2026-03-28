import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
export const PageNotFound = () => {
    const [time, setTime] = useState(5);
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (time == 0) {
        navigate('/', { replace: true })
    }

    return <div>
        <h2>Page Not Found</h2>
        <p>Redirecting to Home in <b style={{ fontSize: "22px", fontWeight: 600, color: "rgb(220, 32, 31)" }}>{time}</b> sec...</p>
        <Link to="/">Home</Link>
    </div>
}