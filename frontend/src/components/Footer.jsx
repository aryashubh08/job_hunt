import React from "react";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/assets/logo.png" alt="" className="h-14 bg-cover" />
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
        </div>

        {/* Right section - Social Icons */}
        <div className="flex gap-6">
          <Facebook className="size-5 text-black hover:text-gray-600 cursor-pointer" />
          <Instagram className="size-5 text-black hover:text-gray-600 cursor-pointer" />
          <Linkedin className="size-5 text-black hover:text-gray-600 cursor-pointer" />
          <Github className="size-5 text-black hover:text-gray-600 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
