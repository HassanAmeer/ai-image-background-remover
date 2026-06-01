import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-cf-cyan-500 text-white group-hover:scale-110 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Chroma<span className="text-cf-cyan-500">Cleanse</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-cf-cyan-500 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-cf-cyan-500 transition-colors">
              How It Works
            </a>
            <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-cf-cyan-500 transition-colors">
              Try It Free
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle className="static" />
            <Button size="sm" asChild className="bg-cf-cyan-500 hover:bg-cf-cyan-500/90 text-white hidden sm:flex">
              <a href="#demo">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}