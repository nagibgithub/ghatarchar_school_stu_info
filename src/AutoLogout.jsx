import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthProvider';


const AutoLogout = () => {
    const { logOut } = useContext(AuthContext); // Assuming you have a custom AuthContext
    const [userActivityTimer, setUserActivityTimer] = useState(null);

    const inactivityTimeout = 30 * 60 * 1000; // 5 minutes

    const resetUserActivityTimer = () => {
        if (userActivityTimer) {
            clearTimeout(userActivityTimer);
        }

        const timer = setTimeout(() => {
            logOut(); // Log out the user
        }, inactivityTimeout);

        setUserActivityTimer(timer);
    };

    const handleUserActivity = () => {
        resetUserActivityTimer();
    };

    useEffect(() => {
        // Listen for user activity events (e.g., mouse clicks, key presses)
        document.addEventListener('mousemove', handleUserActivity);
        document.addEventListener('keypress', handleUserActivity);

        // Initial setup of the timer
        resetUserActivityTimer();

        return () => {
            // Clean up event listeners when component unmounts
            document.removeEventListener('mousemove', handleUserActivity);
            document.removeEventListener('keypress', handleUserActivity);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default AutoLogout;
