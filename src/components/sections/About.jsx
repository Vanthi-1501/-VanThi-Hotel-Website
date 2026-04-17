import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Heart } from 'lucide-react';
import heroImg from '../../assets/hero.png'; // Repurposing or I should have another one

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImg} 
                alt="Hotel Experience" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-luxury-gold/10 rounded-full -z-0 blur-3xl" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-luxury-gold/5 rounded-full -z-0 blur-2xl" />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block">About Our Hotel</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark mb-8 leading-tight">
              A Haven of <span className="italic">Excellence</span> and Tranquility
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Located in the vibrant heart of the city, VanThi Luxury Hotel offers an unparalleled experience of elegance. Since our inception, we have been dedicated to providing a sanctuary of sophistication for travelers seeking the extraordinary.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex items-start space-x-4">
                <div className="bg-luxury-cream p-3 rounded-lg text-luxury-gold">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-luxury-dark mb-1">5-Star Excellence</h4>
                  <p className="text-gray-500 text-sm">Award-winning service and amenities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-luxury-cream p-3 rounded-lg text-luxury-gold">
                  <Compass size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-luxury-dark mb-1">Prime Location</h4>
                  <p className="text-gray-500 text-sm">Minutes away from the city's key landmarks.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-luxury-cream p-3 rounded-lg text-luxury-gold">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-luxury-dark mb-1">True Hospitality</h4>
                  <p className="text-gray-500 text-sm">Where every guest is treated like royalty.</p>
                </div>
              </div>
            </div>

            <button className="btn-primary">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
