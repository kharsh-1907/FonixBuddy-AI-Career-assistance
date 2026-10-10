import { useEffect } from "react";
import "./style/alert.scss";

function Alert({ message, type = "success", onClose,className="" }) {
    useEffect(() => {
        if (!message || type === "loading" || !onClose) return;
        const timer = setTimeout(() => {
            onClose();
        }, 2500);
        return () => clearTimeout(timer);
    }, [message, type, onClose]);

    if (!message) return null;

    return (
        <div className={`custom-alert ${type} ${className}`.trim()}> {message}</div>
    );
}
export default Alert;