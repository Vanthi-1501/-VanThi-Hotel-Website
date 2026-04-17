import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Users, BedDouble } from 'lucide-react';
import deluxImg from '../../assets/room-deluxe.png';
import suiteImg from '../../assets/room-suite.png';
import penthouseImg from '../../assets/room-penthouse.png';

const rooms = [
  {
    id: 1,
    name: 'Deluxe City View',
    image: deluxImg,
    price: 199,
    description: 'A spacious room with a breathtaking view of the city skyline, equipped with premium amenities.',
    size: '45m²',
    guests: '2 Guests',
    bed: 'King Bed'
  },
  {
    id: 2,
    name: 'Executive Suite',
    image: suiteImg,
    price: 349,
    description: 'Our executive suite offers separate living and sleeping areas with exclusive lounge access.',
    size: '85m²',
    guests: '3 Guests',
    bed: 'Super King'
  },
  {
    id: 3,
    name: 'Penthouse Panorama',
    image: penthouseImg,
    price: 899,
    description: 'The ultimate luxury experience featuring a private terrace and 360-degree views.',
    size: '150m²',
    guests: '4 Guests',
    bed: '2 King Beds'
  }
];

const RoomGrid = () => {
  return (
    <section id="rooms" className="py-24 bg-luxury-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block"
          >
            Accommodations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark"
          >
            Luxury Rooms & Suites
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="luxury-card group"
            >
              <div className="relative h-[300px] overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-luxury-dark/80 text-white px-4 py-1 rounded backdrop-blur-sm text-sm font-medium">
                  From ${room.price}/night
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-luxury-dark mb-4 group-hover:text-luxury-gold transition-colors">
                  {room.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {room.description}
                </p>
                
                <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-widest border-t border-gray-100 pt-6 mb-6">
                  <div className="flex items-center gap-1">
                    <Maximize2 size={14} className="text-luxury-gold" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-luxury-gold" />
                    <span>{room.guests}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BedDouble size={14} className="text-luxury-gold" />
                    <span>{room.bed}</span>
                  </div>
                </div>

                <button className="w-full py-3 border border-luxury-gold text-luxury-gold font-bold rounded-lg hover:bg-luxury-gold hover:text-white transition-all duration-300">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomGrid;
