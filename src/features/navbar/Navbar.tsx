import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { DarkModeToggle } from "@features/index.ts";

const Navbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-2 flex justify-between items-center sticky top-0 z-50">
            <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                <a href="#">REONIC</a>
            </div>

            <div className="flex items-center space-x-4">
                <DarkModeToggle />

                <div className="relative">
                    <FaUserCircle
                        size={32}
                        className="cursor-pointer text-gray-600 dark:text-gray-300"
                        onClick={toggleDropdown}
                    />

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-10">
                            <ul className="py-1">
                                <li className="px-4 py-2 text-gray-500 dark:text-gray-300 pointer-events-none">
                                    Guest
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
