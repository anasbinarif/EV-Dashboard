import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className={`fixed bottom-4 right-4 z-50 p-3 rounded-full transition-colors duration-300 shadow-lg ${isDarkMode ? 'bg-gray-200 text-gray-900' : 'bg-gray-800 text-gray-200'
                }`}
        >
            {isDarkMode ? (
                <FaSun className="w-6 h-6" />
            ) : (
                <FaMoon className="w-6 h-6" />
            )}
        </button>
    );
};

export default DarkModeToggle;
