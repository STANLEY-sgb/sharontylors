'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  imageUrl?: string | null;
  category: string;
  description?: string | null;
  video?: string | null;
  featured?: boolean;
}

export default function ProductCard({
  name,
  price,
  image,
  imageUrl,
  video,
  category,
}: ProductCardProps) {
  // Prefer video if available, then imageUrl, then image
  const selectedMedia = imageUrl || image || '';

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="card group"
    >
      <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {video ? (
          <video
            src={video}
            controls
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700"
            playsInline
          />
        ) : selectedMedia ? (
          <Image
            src={selectedMedia}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 font-black text-2xl">
              ST
            </div>
            <span className="font-black text-gray-400 uppercase tracking-widest text-sm">{name}</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="font-black text-xl mb-4 group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
          {name}
        </h3>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</span>
            <span className="text-primary font-black text-xl tracking-tighter">
              UGX {price.toLocaleString()}
            </span>
          </div>
          <Link
            href={`/products`}
            className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all shadow-xl active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
