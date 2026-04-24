import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../../assets/hero.png';
import deluxImg from '../../assets/room-deluxe.png';
import suiteImg from '../../assets/room-suite.png';

const images = [
  { src: heroImg, title: 'Sảnh chính', category: 'Kiến trúc' },
  { src: deluxImg, title: 'Phòng Deluxe', category: 'Nội thất' },
  { src: suiteImg, title: 'Phòng Suite', category: 'Sang trọng' },
  { src: heroImg, title: 'Nhà hàng', category: 'Ẩm thực' }, 
  { src: deluxImg, title: 'Wellness Spa', category: 'Thư giãn' }, 
  { src: suiteImg, title: 'Sân hiên Hoàng hôn', category: 'Ngoại thất' }, 
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-luxury-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block"
          >
            Hành trình Thị giác
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark"
          >
            Khoảnh khắc Đáng nhớ
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-[300px] overflow-hidden rounded-xl cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
                <span className="text-luxury-gold uppercase tracking-widest text-xs mb-2">{img.category}</span>
                <h4 className="text-xl font-serif font-bold">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
