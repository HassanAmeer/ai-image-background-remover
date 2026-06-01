import React from 'react';
import { Sparkles } from 'lucide-react';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cf-cyan-500 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Chroma<span className="text-cf-cyan-500">Cleanse</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-cf-cyan-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cf-cyan-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cf-cyan-500 transition-colors">Cookies</a>
            <a href="#" className="hover:text-cf-cyan-500 transition-colors">Contact</a>
          </nav>
          <div className="text-sm text-muted-foreground/60">
            &copy; {currentYear} ChromaCleanse AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}