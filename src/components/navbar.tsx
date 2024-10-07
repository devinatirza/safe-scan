import React from 'react';
import { Shield } from 'lucide-react';

interface NavbarProps {
  activeItem?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem }) => {
  const navItems = [
    { name: 'Home', path: '/'},
    { name: 'Products', path: '/products'},
    { name: 'About Us', path: '/about.html' },
    { name: 'Account', path: '/account.html' }
  ];

  return (
    <nav className="bg-gray-900 bg-opacity-80 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href='/' className="flex items-center">
          <Shield className="w-8 h-8 text-cyan-400 mr-2" />
          <span className="text-xl font-bold text-gray-100">SafeScan</span>
        </a>
        <div className="flex space-x-6">
          {navItems.map(item => (
            <a 
              key={item.name} 
              href={item.path}
              className={`transition duration-300 ${
                activeItem === item.name ? 'text-cyan-300' : 'text-gray-100 hover:text-cyan-300'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;