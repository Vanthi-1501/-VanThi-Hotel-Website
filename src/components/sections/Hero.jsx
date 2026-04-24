import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search } from 'lucide-react';
import heroImg from '../../assets/hero.png';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6"
        >
          Chào đón bạn đến với <span className="text-luxury-gold">VanThi</span> Luxury
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto tracking-wide"
        >
          Trải nghiệm sự sang trọng và thoải mái trong những căn phòng và dãy phòng được thiết kế tỉ mỉ của chúng tôi.
        </motion.p>

        {/* Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white p-4 md:p-6 rounded-xl shadow-2xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div className="text-left">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Ngày nhận phòng</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
              <input 
                type="text" 
                placeholder="Chọn ngày" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-luxury-dark focus:outline-none focus:ring-2 focus:ring-luxury-gold/20"
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Ngày trả phòng</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
              <input 
                type="text" 
                placeholder="Chọn ngày" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-luxury-dark focus:outline-none focus:ring-2 focus:ring-luxury-gold/20"
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Số lượng khách</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
              <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-luxury-dark focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 appearance-none">
                <option>1 Khách</option>
                <option>2 Khách</option>
                <option>3 Khách</option>
                <option>4+ Khách</option>
              </select>
            </div>
          </div>

          <button className="bg-luxury-gold text-white h-[50px] rounded-lg font-bold flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <Search size={20} />
            <span>Tìm kiếm phòng</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-[30px] h-[50px] border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
