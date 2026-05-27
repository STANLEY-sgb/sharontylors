'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden bg-gradient-to-br from-[#6B4C9A] via-[#8B6CBF] to-[#D4A574]/10">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold tracking-wider uppercase border border-white/30"
          >
            Kampala&apos;s Premium Tailors
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
          >
            SHARON <span className="text-secondary">TAILORS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-10 font-medium leading-relaxed px-4"
          >
            Elevate your style with custom craftsmanship and a perfect fit. 
            Traditional beauty meets modern elegance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-6"
          >
            <Link href="/products" className="w-full sm:w-auto btn-primary bg-white !text-primary hover:bg-white/90">
              Shop Collection
            </Link>
            <Link href="/book-appointment" className="w-full sm:w-auto btn-secondary !border-white !text-white hover:bg-white hover:!text-primary">
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48"></div>
    </section>
  );
}
