import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        
        {/* Row 1: About, Quick Links, Contact */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-8 md:space-y-0 md:space-x-8">
          
          {/* About Section */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-400">
              We are passionate about bringing you the best and most delicious food.
            </p>
          </div>
          
          {/* Links Section */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li className="mb-2">
                <a href="/menu" className="hover:underline">Menu</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:underline">About Us</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: info@foodwebsite.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
            <p className="text-gray-400">Address: 123 Food Street, City, Country</p>
          </div>
          
        </div>
        
        {/* Row 2: Social Media & Copyright */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="mb-4">Follow us on:</p>
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Twitter
            </a>
          </div>
          <p className="text-sm text-gray-500">&copy; 2024 Food Website. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
