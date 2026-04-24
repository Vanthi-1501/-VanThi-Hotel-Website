import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Maximize2, Users, BedDouble } from 'lucide-react';
import { roomService } from '../../services/roomService';
import deluxImg from '../../assets/room-deluxe.png';
import suiteImg from '../../assets/room-suite.png';
import penthouseImg from '../../assets/room-penthouse.png';

const DEFAULT_ROOMS = [
  {
    id: 1,
    name: 'Deluxe City View',
    image: deluxImg,
    price: 199,
    description: 'Căn phòng rộng rãi với tầm nhìn ngoạn mục ra đường chân trời thành phố, được trang bị đầy đủ tiện nghi cao cấp.',
    size: '45m²',
    guests: '2 Khách',
    bed: 'Giường King'
  },
  {
    id: 2,
    name: 'Executive Suite',
    image: suiteImg,
    price: 349,
    description: 'Phòng suite cao cấp của chúng tôi có khu vực khách và ngủ riêng biệt cùng đặc quyền sử dụng sảnh chờ riêng.',
    size: '85m²',
    guests: '3 Khách',
    bed: 'Giường Super King'
  },
  {
    id: 3,
    name: 'Penthouse Panorama',
    image: penthouseImg,
    price: 899,
    description: 'Trải nghiệm xa hoa tột bậc với sân hiên riêng biệt và tầm nhìn 360 độ toàn cảnh thành phố.',
    size: '150m²',
    guests: '4 Khách',
    bed: '2 Giường King'
  }
];

const RoomGrid = ({ filter }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await roomService.getRoomTypes();
        if (response.data && response.data.length > 0) {
          const formattedRooms = response.data.map(type => ({
            id: type.id,
            name: type.name,
            price: type.price,
            isAvailable: type.isAvailable,
            availableCount: type.availableCount,
            description: type.description || 'Căn phòng sang trọng với đầy đủ tiện ích và dịch vụ cao cấp.',
            image: type.image || (type.id % 3 === 0 ? penthouseImg : type.id % 2 === 0 ? suiteImg : deluxImg),
            size: type.size || '45m²',
            guests: type.guests || '2 Khách',
            bed: type.bed || 'Giường King'
          }));
          setRooms(formattedRooms);
        } else {
          setRooms(DEFAULT_ROOMS);
        }
      } catch (error) {
        console.error('Error fetching room types:', error);
        setRooms(DEFAULT_ROOMS);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  useEffect(() => {
    if (!filter) {
      setFilteredRooms(rooms);
      return;
    }

    const { type, guests } = filter;
    const filterLower = type.toLowerCase();
    
    const filtered = rooms.filter(room => {
      // Logic lọc theo tên hoặc mô tả
      const name = room.name.toLowerCase();
      
      let typeMatch = false;
      if (filterLower.includes('tất cả')) {
        typeMatch = true;
      } else if (filterLower.includes('thường')) {
        typeMatch = name.includes('deluxe') || name.includes('city') || name.includes('thường');
      } else if (filterLower.includes('vip')) {
        typeMatch = name.includes('suite') || name.includes('executive') || name.includes('vip');
      } else if (filterLower.includes('tổng thống')) {
        typeMatch = name.includes('penthouse') || name.includes('president') || name.includes('tổng thống');
      } else {
        typeMatch = true; // Fallback
      }

      // Lọc theo số lượng khách (nếu room.guests là chuỗi "X Khách" thì lấy số X)
      const roomCapacity = parseInt(room.guests);
      const requestedGuests = parseInt(guests);
      
      const guestMatch = roomCapacity >= requestedGuests;

      return typeMatch && guestMatch;
    });

    setFilteredRooms(filtered);
  }, [filter, rooms]);
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
            Chỗ nghỉ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark"
          >
            Phòng & Suite Sang Trọng
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRooms.length > 0 ? filteredRooms.map((room, index) => (
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
                  Từ ${room.price}/đêm
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                  room.isAvailable ? 'bg-emerald-500/80 text-white' : 'bg-rose-500/80 text-white'
                }`}>
                  {room.isAvailable ? `Còn ${room.availableCount} phòng` : 'Hết phòng'}
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

                <Link 
                  to={`/room/${room.id}`}
                  className="block w-full py-3 text-center border border-luxury-gold text-luxury-gold font-bold rounded-lg hover:bg-luxury-gold hover:text-white transition-all duration-300"
                >
                  Đặt phòng ngay
                </Link>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-gray-500 italic">Rất tiếc, không tìm thấy phòng phù hợp với yêu cầu của bạn. Vui lòng chọn loại phòng hoặc số lượng khách khác.</p>
              <button 
                onClick={() => setFilteredRooms(rooms)}
                className="mt-6 text-luxury-gold hover:underline font-bold"
              >
                Xem tất cả các phòng
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomGrid;
