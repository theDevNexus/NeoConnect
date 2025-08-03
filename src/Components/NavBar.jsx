// components/NavBar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Tools", href: "#tools" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar({onDemoClick}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="p-4 border-b sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
          Neo Connect
        </h1>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-200 hover:text-cyan-400 transition font-medium"
            >
              {item.name}
            </a>
          ))}
          <a
            href=""
            className="text-gray-300 hover:text-cyan-400 transition font-medium"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href="#"
            className="bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold"
            onClick={onDemoClick}
          >
            Demo
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-200"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4 text-gray-100 bg-gray-900/90 backdrop-blur rounded-b-xl py-4 shadow-md">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition font-medium"
            >
              {item.name}
            </a>
          ))}
          <a href="#" className="hover:text-cyan-400 transition font-medium">
            GitHub
          </a>
          <a
            href="#"
            className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold"
          >
            Demo
          </a>
        </div>
      )}
    </nav>
  );
}
