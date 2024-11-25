import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeItem?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/'},
    { name: 'Products', path: '/products'},
    { name: 'About Us', path: '/about' },
    { name: 'Account', path: '/account' }
  ];

  return (
    <>
      <nav className="bg-gray-900 bg-opacity-80 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href='/' className="flex items-center">
            <Shield className="w-8 h-8 text-cyan-400 mr-2" />
            <span className="text-xl font-bold text-gray-100">SafeScan</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-100 hover:text-cyan-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-40">
          <div className="flex flex-col items-center justify-start pt-20 space-y-8">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.path}
                className={`text-xl transition duration-300 ${
                  activeItem === item.name ? 'text-cyan-300' : 'text-gray-100 hover:text-cyan-300'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;