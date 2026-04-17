import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alexandra Smith',
    role: 'Business Traveler',
    text: 'The attention to detail at VanThi Luxury is simply unmatched. The suite was impeccable and the staff went above and beyond.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Summer Guest',
    text: 'A truly rejuvenating experience. The infinity pool and spa facilities are among the best I have ever visited worldwide.',
    rating: 5
  },
  {
    name: 'David & Sarah',
    role: 'Honeymooners',
    text: 'We couldn’t have asked for a more romantic setting. The sunset views from the penthouse were the highlight of our trip.',
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
            Guest Reviews
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark"
          >
            Voices of Satisfaction
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
