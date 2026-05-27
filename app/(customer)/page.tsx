'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, ChevronRight, Star, Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  video: string | null;
  featured: boolean;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products?featured=true');
        const data = await res.json();
        if (!mounted) return;
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchFeatured();
    const interval = setInterval(fetchFeatured, 5000); // refresh featured products every 5s
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const marqueeTexts = [
    "Perfect Fit Guaranteed",
    "Custom Ankara Styles",
    "Corporate Elegance",
    "Quick Alterations",
    "Wedding Dress Specialists",
    "Jemba Plaza, Kampala",
  ];

  return (
    <div className="overflow-hidden bg-white">
      <Navbar />
      
      <Hero />

      {/* Marquee Section */}
      <div className="bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-white/10">
        <div className="animate-marquee flex gap-12 items-center">
          {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
            <span key={i} className="text-white font-black text-lg md:text-2xl uppercase tracking-tighter flex items-center gap-4">
              <Star className="text-secondary fill-secondary" size={20} />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Video Inspiration Section */}
      <section className="py-24 px-4 bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Style Inspiration</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Witness our craftsmanship in motion. From stunning Ankara to elegant wedding gowns.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: "/videos/ankara-styles.mp4", label: "Ankara Elegance" },
              { src: "/videos/wedding-dresses.mp4", label: "Bridal Dreams" },
              { src: "/videos/office-wears.mp4", label: "Corporate Class" }
            ].map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-[9/16] cursor-pointer"
              >
                <video 
                  src={video.src} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                  autoPlay
                  muted 
                  loop
                  playsInline
                ></video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <h3 className="text-white font-bold text-2xl tracking-tight">{video.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA - Super Bright and Mobile Optimized */}
      <section className="py-20 px-4 bg-[#25D366] relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="glass-card !bg-white/10 p-10 md:p-16 border-white/30"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Need a Fast Quote?</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 font-medium max-w-2xl mx-auto">
              Share your design ideas or ask for pricing instantly on WhatsApp. 
              We&apos;re ready to bring your vision to life!
            </p>
            <a 
              href="https://wa.me/256702084480" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-white text-[#25D366] px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              <MessageCircle size={32} />
              CHAT ON WHATSAPP
            </a>
          </motion.div>
        </div>
        {/* Background bubbles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="section-title !mb-2">New Arrivals</h2>
              <p className="text-gray-500 font-medium">Explore our latest handcrafted pieces</p>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-primary font-black text-lg hover:gap-4 transition-all uppercase tracking-widest">
              View All Collection <ChevronRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-3xl bg-gray-100 animate-pulse"></div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product: Product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400 font-medium text-xl italic">
                Our latest collection is coming soon...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Section - Redesigned for Mobile */}
      <section className="py-24 px-4 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">FIND US IN <span className="text-secondary">KAMPALA</span></h2>
              <p className="text-xl text-gray-400 mb-10 font-medium">
                Located at the prestigious Jemba Plaza, we are easily accessible and ready to serve you.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <MapPin className="text-secondary" />, title: "Address", content: "Jemba Plaza, Kampala, Uganda (After Old Taxi Park)" },
                  { icon: <Phone className="text-secondary" />, title: "Call Us", content: "+256 705 241 179" },
                  { icon: <Clock className="text-secondary" />, title: "Hours", content: "Mon-Sat: 8AM - 7PM" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-sm text-secondary mb-1">{item.title}</h4>
                      <p className="text-lg font-bold">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.757833005838!2d32.57688137496426!3d0.3129189996840003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb943d63b2f9%3A0x6d9f6f6f6f6f6f6f!2sJemba%20Plaza!5e0!3m2!1sen!2sug!4v1714500000000!5m2!1sen!2sug" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-700"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
