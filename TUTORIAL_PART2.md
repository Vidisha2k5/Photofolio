# Photography Portfolio Tutorial - Part 2
## Continuing from Part 1...

---

## 8. Dynamic Portfolio Section

### Step 8.1: Create Portfolio Component

Create `app/components/sections/Portfolio.tsx`:

```typescript
// app/components/sections/Portfolio.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { portfolioProjects } from '@/app/data/portfolio';
import { formatDate } from '@/app/lib/utils';

const Portfolio = () => {
  const featuredProjects = portfolioProjects.filter(project => project.featured);

  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover my latest photography projects and creative endeavors
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-200 dark:bg-gray-700">
                <Image
                  src={project.images[0]?.src || '/images/placeholder.jpg'}
                  alt={project.images[0]?.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(project.date)}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* View Project Link */}
                <Link
                  href={`/portfolio/${project.id}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 group/link"
                >
                  View Project
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/gallery" className="btn-primary">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
```

### Step 8.2: Update Homepage Layout

Create `app/page.tsx`:

```typescript
// app/page.tsx
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import Portfolio from './components/sections/Portfolio';

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <Portfolio />
    </main>
  );
}
```

---

## 9. About Page

Create `app/about/page.tsx`:

```typescript
// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Award, Users, Heart } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Camera, label: 'Photos Taken', value: '10,000+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Heart, label: 'Years Experience', value: '8+' },
  ];

  const skills = [
    { name: 'Portrait Photography', level: 95 },
    { name: 'Landscape Photography', level: 90 },
    { name: 'Wedding Photography', level: 88 },
    { name: 'Street Photography', level: 85 },
    { name: 'Photo Editing', level: 92 },
    { name: 'Studio Lighting', level: 87 },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I'm a passionate photographer with over 8 years of experience capturing 
                life's most precious moments. My journey began with a simple camera and 
                an insatiable curiosity about the world around me.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                From intimate portraits to breathtaking landscapes, I believe every 
                photograph should tell a story. My approach combines technical expertise 
                with creative vision to create images that resonate with emotion and meaning.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="btn-primary">
                  Work With Me
                </a>
                <a href="/gallery" className="btn-secondary">
                  View My Work
                </a>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-2xl">
                <Image
                  src="/images/about/profile.jpg"
                  alt="Photographer profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-100 dark:bg-primary-900 rounded-full opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              My Skills
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Years of experience have honed my expertise across various photography disciplines
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">
                My Philosophy
              </h2>
              <blockquote className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 italic leading-relaxed mb-8">
                "Photography is not just about capturing what you see, but about 
                revealing what you feel. Every frame is an opportunity to freeze 
                a moment in time and make it eternal."
              </blockquote>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                I believe in the power of authentic storytelling through imagery. 
                Whether it's the joy in a couple's eyes on their wedding day, the 
                serene beauty of a landscape at dawn, or the raw emotion captured 
                in a portrait, my goal is to create photographs that speak to the 
                heart and stand the test of time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
```

---

## 10. Contact Page

Create `app/contact/page.tsx`:

```typescript
// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { ContactForm } from '@/app/types';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@photofolio.com',
      href: 'mailto:hello@photofolio.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'New York, NY',
      href: '#',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to capture your special moments? Let's discuss your photography needs 
              and create something beautiful together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  I'd love to hear about your project and discuss how we can work 
                  together to create something amazing. Feel free to reach out through 
                  any of the following channels.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="flex items-center p-6 card hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.details}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="card p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Response Time
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I typically respond to all inquiries within 24 hours. For urgent 
                  requests, please call directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
```

---

## 11. Dark Mode Support

### Step 11.1: Update Root Layout

Create `app/layout.tsx`:

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'PhotoFolio - Professional Photography Portfolio',
  description: 'Capturing life\'s beautiful moments through professional photography. Explore my portfolio of portraits, landscapes, weddings, and more.',
  keywords: 'photography, portfolio, photographer, portraits, landscapes, weddings, professional',
  authors: [{ name: 'PhotoFolio' }],
  openGraph: {
    title: 'PhotoFolio - Professional Photography Portfolio',
    description: 'Capturing life\'s beautiful moments through professional photography.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhotoFolio - Professional Photography Portfolio',
    description: 'Capturing life\'s beautiful moments through professional photography.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 12. Animations and Transitions

### Step 12.1: Create Animation Utilities

Create `app/lib/animations.ts`:

```typescript
// app/lib/animations.ts
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};
```

### Step 12.2: Create Gallery Page

Create `app/gallery/page.tsx`:

```typescript
// app/gallery/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { samplePhotos, categories } from '@/app/data/portfolio';
import { staggerContainer, staggerItem } from '@/app/lib/animations';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const filteredPhotos = selectedCategory === 'All' 
    ? samplePhotos 
    : samplePhotos.filter(photo => photo.category === selectedCategory);

  const handleImageLoad = (photoId: string) => {
    setLoadedImages(prev => new Set(prev).add(photoId));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore my complete collection of photographs across different categories and styles
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={staggerItem}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                      loadedImages.has(photo.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    onLoad={() => handleImageLoad(photo.id)}
                  />
                  
                  {/* Loading Skeleton */}
                  {!loadedImages.has(photo.id) && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-center text-white p-4">
                      <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                      <p className="text-sm text-gray-200">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
```

---

## 13. Production Deployment

### Step 13.1: Create next.config.js

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

### Step 13.2: Update package.json scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "build-analyze": "ANALYZE=true next build"
  }
}
```

### Step 13.3: Create deployment checklist

Create `DEPLOYMENT.md`:

```markdown
# Deployment Checklist

## Pre-deployment
- [ ] Run `npm run type-check` to ensure no TypeScript errors
- [ ] Run `npm run lint` to check for linting issues
- [ ] Test all pages and functionality
- [ ] Optimize images and add proper alt texts
- [ ] Update metadata and SEO tags
- [ ] Test dark mode functionality
- [ ] Test responsive design on different screen sizes

## Environment Variables
Create `.env.local` for local development:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Build and Deploy
1. Run `npm run build` to create production build
2. Test production build locally with `npm start`
3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## Post-deployment
- [ ] Test all functionality on live site
- [ ] Check loading speeds and performance
- [ ] Verify SEO meta tags
- [ ] Test contact form submission
- [ ] Check analytics integration (if added)
```

---

## Conclusion

Congratulations! You've built a complete, production-ready photography portfolio website with:

✅ **Modern Tech Stack**: Next.js 14, TypeScript, TailwindCSS
✅ **Responsive Design**: Mobile-first approach with beautiful layouts
✅ **Dark Mode**: Seamless theme switching
✅ **Smooth Animations**: Framer Motion for engaging user experience
✅ **Photo Gallery**: Interactive grid with filtering and modal view
✅ **Dynamic Portfolio**: Showcase your best work
✅ **Contact Form**: Professional contact page with form handling
✅ **SEO Optimized**: Proper meta tags and structure
✅ **Performance**: Optimized images and loading states
✅ **Accessibility**: ARIA labels and keyboard navigation

### Next Steps:
1. Add your own photos to the `public/images` directory
2. Customize colors, fonts, and content to match your brand
3. Integrate with a CMS like Sanity or Contentful for dynamic content
4. Add analytics (Google Analytics, Plausible)
5. Implement a real contact form backend
6. Add a blog section for photography tips and stories
7. Integrate with social media APIs
8. Add image optimization and lazy loading enhancements

Your photography portfolio is now ready to showcase your amazing work to the world! 📸✨