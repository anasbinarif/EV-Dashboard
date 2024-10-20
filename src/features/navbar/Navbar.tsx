import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center sticky top-0 z-50">
            <div className="text-xl font-bold">
                <a href="#">REONIC</a>
            </div>

            <div className="relative">
                <FaUserCircle
                    size={32}
                    className="cursor-pointer text-gray-600"
                    onClick={toggleDropdown}
                />

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                        <ul className="py-1">
                            <li className="px-4 py-2 text-gray-500 pointer-events-none">
                                Guest
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
