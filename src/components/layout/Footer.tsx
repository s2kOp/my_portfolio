"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative w-full bg-black py-20 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Identity */}
        <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                ROHIT R NAIR
            </h2>
            <p className="text-zinc-500 text-sm max-w-xs">
                Investigating human limits through high-consequence environments.
            </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            
            <div className="flex flex-col gap-4 text-sm font-mono text-zinc-400">
                <FooterLink href="#contact">Contact</FooterLink>
            </div>

        </div>

      </div>

      {/* Copyright / Signal End */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 flex justify-between items-center text-xs text-zinc-600 font-mono">
          <span>© {new Date().getFullYear()}</span>
      </div>

    </footer>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <a 
            href={href} 
            className="hover:text-[#ccff00] transition-colors duration-300 flex items-center gap-2 group"
        >
            <span className="w-1 h-1 bg-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity" />
            {children}
        </a>
    );
}
