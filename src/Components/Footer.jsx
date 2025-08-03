import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm">&copy; 2025 Neo Connect. All rights reserved.</p>
        
        <div className="flex gap-5 text-gray-400">
          <a
            href="https://github.com/theDevNexus/NeoConnect"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300 hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/aditya-kumar-45aa49283/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300 hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:adityasuri11ss@gmail.com"
            className="hover:text-white transition duration-300 hover:scale-110"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
