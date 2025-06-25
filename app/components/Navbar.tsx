"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // usa lucide o heroicons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-[9999] bg-white shadow-md px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Zerquera Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#pricing">Pricing</Link></li>
          <li><Link href="#contact">Contact</Link></li>
          <li><Link href="/estimate">Get estimate</Link></li>
        </ul>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link href="/quote" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 bg-white rounded-lg shadow p-4 space-y-4">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="#services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="#pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="#contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/quote" className="block bg-purple-600 text-white text-center py-2 rounded-lg" onClick={() => setOpen(false)}>
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}