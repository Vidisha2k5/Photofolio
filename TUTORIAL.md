# Photography Portfolio Website Tutorial
## Next.js + TypeScript + TailwindCSS

This comprehensive tutorial will guide you through building a modern, responsive photography portfolio website from scratch.

## Table of Contents
1. [Project Setup](#1-project-setup)
2. [TailwindCSS Configuration](#2-tailwindcss-configuration)
3. [Project Structure](#3-project-structure)
4. [Homepage with Hero Section](#4-homepage-with-hero-section)
5. [Navigation Bar](#5-navigation-bar)
6. [Footer Component](#6-footer-component)
7. [Photo Gallery Grid](#7-photo-gallery-grid)
8. [Dynamic Portfolio Section](#8-dynamic-portfolio-section)
9. [About Page](#9-about-page)
10. [Contact Page](#10-contact-page)
11. [Dark Mode Support](#11-dark-mode-support)
12. [Animations and Transitions](#12-animations-and-transitions)
13. [Production Deployment](#13-production-deployment)

---

## 1. Project Setup

### Step 1.1: Create a new Next.js project with TypeScript

First, let's create a new Next.js project with TypeScript support:

```bash
npx create-next-app@latest photography-portfolio --typescript --tailwind --eslint --app
cd photography-portfolio
```

### Step 1.2: Install additional dependencies

Install the required packages for our portfolio:

```bash
npm install lucide-react framer-motion next-themes
npm install -D @types/node
```

**Package explanations:**
- `lucide-react`: Modern icon library
- `framer-motion`: Animation library for smooth transitions
- `next-themes`: Easy dark mode implementation
- `@types/node`: TypeScript definitions for Node.js

---

## 2. TailwindCSS Configuration

### Step 2.1: Update tailwind.config.js

Replace the default Tailwind configuration with our custom setup:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### Step 2.2: Update globals.css

Replace the content of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }
  
  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }
  
  .card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700;
  }
  
  .section-padding {
    @apply px-4 sm:px-6 lg:px-8 py-16 lg:py-24;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent;
  }
  
  .glass-effect {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }
}
```

---

## 3. Project Structure

Let's create the proper folder structure for our portfolio:

```
app/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   └── Portfolio.tsx
│   └── providers/
│       └── ThemeProvider.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── gallery/
│   └── page.tsx
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
├── data/
│   └── portfolio.ts
└── public/
    └── images/
        ├── hero/
        ├── gallery/
        └── portfolio/
```

---

## 4. Homepage with Hero Section

### Step 4.1: Create TypeScript types

First, let's define our TypeScript interfaces in `app/types/index.ts`:

```typescript
// app/types/index.ts
export interface Photo {
  id: string;
  title: string;
  description?: string;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
  width: number;
  height: number;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: Photo[];
  category: string;
  date: string;
  featured?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}
```

### Step 4.2: Create utility functions

Create `app/lib/utils.ts`:

```typescript
// app/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
```

### Step 4.3: Create Theme Provider

Create `app/components/providers/ThemeProvider.tsx`:

```typescript
// app/components/providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Step 4.4: Create Hero Section

Create `app/components/sections/Hero.tsx`:

```typescript
// app/components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Camera } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    gallerySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Photography Hero Background"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Camera className="w-16 h-16 mx-auto text-primary-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold mb-6"
          >
            Capturing Life's
            <span className="block text-gradient">Beautiful Moments</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-gray-200"
          >
            Professional Photography Portfolio
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 text-gray-300 leading-relaxed"
          >
            Welcome to my world of visual storytelling. Explore a curated collection 
            of moments frozen in time, each telling its own unique story.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToGallery}
              className="btn-primary text-lg px-8 py-4"
            >
              View My Work
            </button>
            <a
              href="/contact"
              className="btn-secondary text-lg px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToGallery}
            className="animate-bounce p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            aria-label="Scroll to gallery"
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
```

---

## 5. Navigation Bar

### Step 5.1: Create Navigation Component

Create `app/components/layout/Navigation.tsx`:

```typescript
// app/components/layout/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Camera } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/app/types';

const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Camera className="w-8 h-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" />
            <span className="text-xl font-serif font-bold text-gray-900 dark:text-white">
              PhotoFolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
```

### Step 5.2: Create Header Component

Create `app/components/layout/Header.tsx`:

```typescript
// app/components/layout/Header.tsx
import Navigation from './Navigation';

const Header = () => {
  return <Navigation />;
};

export default Header;
```

---

## 6. Footer Component

Create `app/components/layout/Footer.tsx`:

```typescript
// app/components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { Camera, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@photofolio.com', href: 'mailto:hello@photofolio.com' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: 'New York, NY', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Camera className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-serif font-bold">PhotoFolio</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Capturing life's beautiful moments through the lens of creativity and passion. 
              Every photograph tells a story, and I'm here to help you tell yours.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-primary-600 transition-colors duration-200 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index}>
                    <a
                      href={contact.href}
                      className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-primary-400 transition-colors duration-200" />
                      <span>{contact.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} PhotoFolio. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

## 7. Photo Gallery Grid

### Step 7.1: Create sample data

Create `app/data/portfolio.ts`:

```typescript
// app/data/portfolio.ts
import { Photo, Portfolio } from '@/app/types';

export const samplePhotos: Photo[] = [
  {
    id: '1',
    title: 'Golden Hour Portrait',
    description: 'A beautiful portrait captured during golden hour',
    src: '/images/gallery/portrait-1.jpg',
    alt: 'Golden hour portrait photography',
    category: 'Portrait',
    featured: true,
    width: 800,
    height: 1200,
  },
  {
    id: '2',
    title: 'Urban Architecture',
    description: 'Modern architecture in the city',
    src: '/images/gallery/architecture-1.jpg',
    alt: 'Urban architecture photography',
    category: 'Architecture',
    width: 1200,
    height: 800,
  },
  {
    id: '3',
    title: 'Nature Landscape',
    description: 'Serene landscape photography',
    src: '/images/gallery/landscape-1.jpg',
    alt: 'Nature landscape photography',
    category: 'Landscape',
    featured: true,
    width: 1600,
    height: 900,
  },
  {
    id: '4',
    title: 'Street Photography',
    description: 'Candid moments on the street',
    src: '/images/gallery/street-1.jpg',
    alt: 'Street photography',
    category: 'Street',
    width: 800,
    height: 1200,
  },
  {
    id: '5',
    title: 'Wedding Moments',
    description: 'Beautiful wedding photography',
    src: '/images/gallery/wedding-1.jpg',
    alt: 'Wedding photography',
    category: 'Wedding',
    width: 1200,
    height: 800,
  },
  {
    id: '6',
    title: 'Abstract Art',
    description: 'Creative abstract photography',
    src: '/images/gallery/abstract-1.jpg',
    alt: 'Abstract photography',
    category: 'Abstract',
    width: 800,
    height: 800,
  },
];

export const portfolioProjects: Portfolio[] = [
  {
    id: '1',
    title: 'Urban Exploration',
    description: 'A collection of urban architecture and street photography showcasing the beauty of city life.',
    category: 'Architecture',
    date: '2024-01-15',
    featured: true,
    images: [
      {
        id: 'p1-1',
        title: 'City Skyline',
        src: '/images/portfolio/urban-1.jpg',
        alt: 'City skyline photography',
        category: 'Architecture',
        width: 1600,
        height: 900,
      },
      {
        id: 'p1-2',
        title: 'Modern Building',
        src: '/images/portfolio/urban-2.jpg',
        alt: 'Modern building photography',
        category: 'Architecture',
        width: 800,
        height: 1200,
      },
    ],
  },
  {
    id: '2',
    title: 'Natural Beauty',
    description: 'Capturing the essence of nature through landscape and wildlife photography.',
    category: 'Landscape',
    date: '2024-02-20',
    featured: true,
    images: [
      {
        id: 'p2-1',
        title: 'Mountain Vista',
        src: '/images/portfolio/nature-1.jpg',
        alt: 'Mountain landscape photography',
        category: 'Landscape',
        width: 1600,
        height: 900,
      },
      {
        id: 'p2-2',
        title: 'Forest Path',
        src: '/images/portfolio/nature-2.jpg',
        alt: 'Forest path photography',
        category: 'Landscape',
        width: 1200,
        height: 800,
      },
    ],
  },
];

export const categories = [
  'All',
  'Portrait',
  'Landscape',
  'Architecture',
  'Street',
  'Wedding',
  'Abstract',
];
```

### Step 7.2: Create Gallery Component

Create `app/components/sections/Gallery.tsx`:

```typescript
// app/components/sections/Gallery.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '@/app/types';
import { samplePhotos, categories } from '@/app/data/portfolio';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter photos based on selected category
  const filteredPhotos = selectedCategory === 'All' 
    ? samplePhotos 
    : samplePhotos.filter(photo => photo.category === selectedCategory);

  // Handle photo selection for modal
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(filteredPhotos.findIndex(p => p.id === photo.id));
  };

  // Navigate to previous photo
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  // Navigate to next photo
  const goToNext = () => {
    const newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') setSelectedPhoto(null);
  };

  return (
    <section id="gallery" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my collection of photographs across different categories and styles
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                      <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                      <p className="text-sm text-gray-200">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Photo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[80vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
              </motion.div>

              {/* Photo Info */}
              <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                <h3 className="text-xl font-semibold mb-1">{selectedPhoto.title}</h3>
                <p className="text-gray-300">{selectedPhoto.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {currentIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
```

This tutorial continues with the remaining sections. Would you like me to continue with the next parts covering the Portfolio section, About page, Contact page, and the remaining features?