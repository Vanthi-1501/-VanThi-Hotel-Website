import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Waves, Utensils, Wifi, Car, ShieldCheck, ConciergeBell } from 'lucide-react';
import { roomService } from '../../services/roomService';

const MOCK_SERVICES = [
  {
    icon: <Utensils size={32} />,
    title: 'Ẩm thực Cao cấp',
    desc: 'Nhà hàng từng đoạt giải thưởng phục vụ tinh hoa ẩm thực quốc tế và địa phương.'
  },
  {
    icon: <Waves size={32} />,
    title: 'Hồ bơi vô cực',
    desc: 'Hồ bơi sân thượng tuyệt đẹp với tầm nhìn toàn cảnh đường chân trời thành phố.'
  },
  {
    icon: <Car size={32} />,
    title: 'Đưa đón Sang trọng',
    desc: 'Dịch vụ đưa đón sân bay cao cấp và tham quan thành phố với dàn xe sang trọng.'
  }
];

const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('food') || n.includes('dining') || n.includes('restaurant')) return <Utensils size={32} />;
  if (n.includes('pool') || n.includes('swim')) return <Waves size={32} />;
  if (n.includes('car') || n.includes('transfer')) return <Car size={32} />;
  if (n.includes('wifi')) return <Wifi size={32} />;
  if (n.includes('coffee') || n.includes('breakfast')) return <Coffee size={32} />;
  if (n.includes('security')) return <ShieldCheck size={32} />;
  return <ConciergeBell size={32} />;
};

const Services = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await roomService.getServices();
        if (response.data && response.data.length > 0) {
          const formatted = response.data.map(s => ({
            icon: getIcon(s.name),
            title: s.name,
            desc: s.description || 'Dịch vụ cao cấp mang lại sự thoải mái tối đa cho quý khách.'
          }));
          setData(formatted);
        } else {
          setData(MOCK_SERVICES);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setData(MOCK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block"
        >
          Tiện ích của chúng tôi
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark mb-16"
        >
          Dịch vụ Đẳng cấp Thế giới
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-2xl border border-gray-50 hover:border-luxury-gold/20 hover:bg-luxury-cream transition-all duration-300 group"
            >
              <div className="text-luxury-gold mb-6 flex justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-luxury-dark mb-4 group-hover:text-luxury-gold transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
