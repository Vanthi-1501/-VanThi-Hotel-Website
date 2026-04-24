import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alexandra Smith',
    role: 'Doanh nhân',
    text: 'Sự tỉ mỉ đến từng chi tiết tại VanThi Luxury thực sự vô đối. Căn phòng hoàn mỹ và đội ngũ nhân viên đã phục vụ vượt ngoài mong đợi.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Khách du lịch',
    text: 'Một trải nghiệm thực sự trẻ hóa. Hồ bơi vô cực và các tiện nghi spa là một trong những nơi tốt nhất tôi từng ghé thăm trên toàn thế giới.',
    rating: 5
  },
  {
    name: 'David & Sarah',
    role: 'Cặp đôi',
    text: 'Chúng tôi không thể mong đợi một không gian lãng mạn hơn. Tầm nhìn hoàng hôn từ phòng penthouse là điểm nhấn tuyệt vời nhất trong chuyến đi của chúng tôi.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block"
          >
            Đánh giá của Khách hàng
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark"
          >
            Tiếng nói của Sự hài lòng
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-luxury-cream/50 relative"
            >
              <Quote className="absolute top-6 right-8 text-luxury-gold/20" size={40} />
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-luxury-gold fill-luxury-gold" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 relative z-10">
                "{t.text}"
              </p>
              <div>
                <h4 className="font-bold text-luxury-dark">{t.name}</h4>
                <p className="text-xs text-luxury-gold uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
