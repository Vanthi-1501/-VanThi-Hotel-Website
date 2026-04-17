import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Waves, Utensils, Wifi, Car, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: <Utensils size={32} />,
    title: 'Fine Dining',
    desc: 'Award-winning restaurant featuring international and local gourmet cuisine.'
  },
  {
    icon: <Waves size={32} />,
    title: 'Infinity Pool',
    desc: 'Breathtaking rooftop pool with a panoramic view of the city skyline.'
  },
  {
    icon: <Car size={32} />,
    title: 'Luxury Transport',
    desc: 'Premium airport transfers and city tours in our fleet of luxury vehicles.'
  },
  {
    icon: <Wifi size={32} />,
    title: 'Fast Fiber WiFi',
    desc: 'Stay connected with high-speed internet available throughout the hotel.'
  },
  {
    icon: <Coffee size={32} />,
    title: 'Morning Bistro',
    desc: 'Start your day with our signature freshly brewed coffee and artisanal pastries.'
  },
  {
    icon: <ShieldCheck size={32} />,
    title: '24/7 Security',
    desc: 'Peace of mind with our dedicated security team and state-of-the-art systems.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block"
        >
          Our Facilities
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark mb-16"
        >
          World-Class Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
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
