"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-[9999] bg-white shadow-md overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Zerquera Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-gray-700 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#pricing">Pricing</Link></li>
          <li><Link href="#contact">Contact</Link></li>
          <li><Link href="/estimate">Estimate</Link></li>
        </ul>

        {/* Desktop Action Button */}
        <div className="hidden lg:block">
          <Link href="/book" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="lg:hidden w-full px-4 pb-4 overflow-x-hidden">
          <ul className="bg-white rounded-lg shadow-md space-y-4 p-4">
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="#services" onClick={() => setOpen(false)}>Services</Link></li>
            <li><Link href="#pricing" onClick={() => setOpen(false)}>Pricing</Link></li>
            <li><Link href="#contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link href="/estimate" onClick={() => setOpen(false)}>Estimate</Link></li>
            <li>
              <Link
                href="/book"
                className="block bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={() => setOpen(false)}
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}