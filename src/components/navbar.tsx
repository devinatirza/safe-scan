import React from 'react';
import { Shield } from 'lucide-react';

interface NavbarProps {
  activeItem?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem }) => {
  const navItems = ['Home', 'Products', 'About Us', 'Account'];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-cyan-400 mr-2" />
          <span className="text-xl font-bold text-gray-100">SafeScan</span>
        </div>
        <div className="flex space-x-6">
          {navItems.map(item => (
            <a 
              key={item} 
              href="#" 
              className={`transition duration-300 ${
                activeItem === item ? 'text-cyan-300' : 'text-gray-100 hover:text-cyan-300'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;