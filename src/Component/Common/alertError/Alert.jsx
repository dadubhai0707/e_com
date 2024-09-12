import  { useState, useEffect } from 'react';
function Alert({ title, message }) {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Hide after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);
    return (
        <>
              <div className={`alert-container ${!isVisible ? 'hide' : ''}`}>
            <div className="name">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </div>
        </>
    )
}

export default Alert
