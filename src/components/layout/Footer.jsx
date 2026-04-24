import React from 'react';
import { Globe, Camera, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold">
            VANTHI <span className="text-luxury-gold">LUXURY</span>
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Trải nghiệm lòng hiếu khách đẳng cấp thế giới ngay tại trung tâm thành phố. Khách sạn của chúng tôi kết hợp sự sang trọng hiện đại với nét thanh lịch vượt thời gian.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-luxury-gold transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-luxury-gold transition-colors"><Camera size={20} /></a>
            <a href="#" className="hover:text-luxury-gold transition-colors"><Share2 size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-serif font-semibold">Liên kết nhanh</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Trang chủ</a></li>
            <li><a href="#rooms" className="hover:text-white transition-colors">Phòng nghỉ</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Dịch vụ</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">Bộ sưu tập</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="text-lg font-serif font-semibold">Hỗ trợ</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều khoản & Điều kiện</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Liên hệ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-serif font-semibold">Thông tin liên hệ</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-luxury-gold shrink-0 mt-1" />
              <span>123 Đại lộ Luxury, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-luxury-gold shrink-0" />
              <span>+84 (028) 1234 5678</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-luxury-gold shrink-0" />
              <span>contact@vanthiluxury.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Khách sạn VanThi Luxury. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
};

export default Footer;
