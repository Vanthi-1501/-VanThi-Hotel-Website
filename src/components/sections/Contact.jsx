import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="w-full lg:w-1/3">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block"
            >
              Liên hệ với chúng tôi
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-serif font-bold text-luxury-dark mb-8"
            >
              Kết nối ngay
            </motion.h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-luxury-cream p-3 rounded-lg text-luxury-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-luxury-dark mb-1">Địa chỉ</h4>
                  <p className="text-gray-500">123 Đại lộ Luxury, Quận 1,<br />Thành phố Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-luxury-cream p-3 rounded-lg text-luxury-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-luxury-dark mb-1">Đặt phòng</h4>
                  <p className="text-gray-500">+84 (028) 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-luxury-cream p-3 rounded-lg text-luxury-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-luxury-dark mb-1">Email</h4>
                  <p className="text-gray-500">reservations@vanthiluxury.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-luxury-cream p-8 md:p-12 rounded-2xl shadow-sm"
            >
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Họ và tên</label>
                  <input type="text" placeholder="Nhập tên của bạn" className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-luxury-gold/20 outline-none shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Địa chỉ Email</label>
                  <input type="email" placeholder="email@vi-du.com" className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-luxury-gold/20 outline-none shadow-sm" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Chủ đề</label>
                  <input type="text" placeholder="Chúng tôi có thể giúp gì cho bạn?" className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-luxury-gold/20 outline-none shadow-sm" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Lời nhắn</label>
                  <textarea rows="4" placeholder="Nội dung lời nhắn" className="w-full px-5 py-4 rounded-xl border-none focus:ring-2 focus:ring-luxury-gold/20 outline-none shadow-sm resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="btn-primary w-full md:w-auto px-10 flex items-center justify-center space-x-2">
                    <span>Gửi lời nhắn</span>
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
