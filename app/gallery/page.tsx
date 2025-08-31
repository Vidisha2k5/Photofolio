'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { samplePhotos, categories } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/lib/animations';

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