import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-display font-bold text-gray-800 mb-6 tracking-widest uppercase">
          Rebuild Reality
        </h2>
        
        <div className="flex justify-center space-x-8 mb-8">
          {['Privacy', 'Terms', 'Support', 'Press'].map((item) => (
            <a key={item} href="#" className="text-gray-500 hover:text-cyan-400 text-sm font-mono uppercase transition-colors">
              {item}
            </a>
          ))}
        </div>

        <p className="text-gray-600 text-xs">
          © 2025 RIFTMAW GAME STUDIOS. ALL RIGHTS RESERVED. <br />
          ALL PIXELS WERE HARMED IN THE MAKING OF THIS SITE.
        </p>
      </div>
    </footer>
  );
};
