import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  Wifi, 
  Coffee, 
  Tv, 
  Wind, 
  ShieldCheck,
  Calendar,
  Users,
  CreditCard,
  Loader2
} from 'lucide-react';
import { roomService } from '../services/roomService';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

// Assets (Using the same logic as RoomGrid for placeholders)
import deluxImg from '../assets/room-deluxe.png';
import suiteImg from '../assets/room-suite.png';
import penthouseImg from '../assets/room-penthouse.png';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = authService.getCurrentUser();

  const [formData, setFormData] = useState({
    customerName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 1
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await roomService.getRoomTypes();
        const type = response.data.find(t => t.id.toString() === id);
        if (type) {
          setRoomType(type);
        } else {
          toast.error('Không tìm thấy loại phòng này.');
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Lỗi khi tải thông tin phòng.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Tạo hoặc lấy khách hàng
      const customerRes = await roomService.createCustomer({ 
        name: formData.customerName,
        email: formData.email,
        userId: currentUser?.id 
      });
      const customerId = customerRes.data.id;

      // 2. Tìm một phòng trống thuộc loại phòng này
      const roomsRes = await roomService.getRooms();
      const availableRoom = roomsRes.data.find(r => 
        r.roomTypeId === roomType.id && (r.status === 'Available' || r.status === 'available')
      );

      if (!availableRoom) {
        toast.error('Hiện tại không còn phòng trống nào cho loại phòng này. Vui lòng chọn loại phòng khác.');
        setIsSubmitting(false);
        return;
      }

      // 3. Tạo Booking
      await roomService.createBooking({
        customerId: customerId,
        roomId: availableRoom.id,
        checkIn: new Date(formData.checkIn).toISOString(),
        checkOut: new Date(formData.checkOut).toISOString(),
      });
      
      toast.success('Đặt phòng thành công! Chúng tôi đã ghi nhận yêu cầu của bạn.');
      navigate('/');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data || 'Đã có lỗi xảy ra trong quá trình đặt phòng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  const roomImage = roomType?.image || (roomType?.id % 3 === 0 ? penthouseImg : roomType?.id % 2 === 0 ? suiteImg : deluxImg);

  return (
    <div className="pt-24 pb-20 bg-luxury-cream min-h-screen">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-luxury-dark hover:text-luxury-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold uppercase tracking-widest text-sm">Quay lại danh sách</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Images & Info */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
            >
              <img src={roomImage} alt={roomType.name} className="w-full h-full object-cover" />
            </motion.div>

            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex justify-between items-end">
                <h1 className="text-4xl font-serif font-bold text-luxury-dark">{roomType.name}</h1>
                <div className="text-right">
                  <p className="text-luxury-gold font-bold text-3xl">${roomType.price}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-tighter">mỗi đêm</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {roomType.description || 'Trải nghiệm sự sang trọng và tiện nghi đẳng cấp thế giới trong căn phòng được thiết kế tinh xảo của chúng tôi. Với tầm nhìn tuyệt đẹp và nội thất hiện đại, đây là không gian lý tưởng cho kỳ nghỉ của bạn.'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-700">
                  <Wifi size={20} className="text-luxury-gold" />
                  <span className="text-sm font-medium">Free WiFi</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Coffee size={20} className="text-luxury-gold" />
                  <span className="text-sm font-medium">Bữa sáng</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Tv size={20} className="text-luxury-gold" />
                  <span className="text-sm font-medium">Smart TV</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Wind size={20} className="text-luxury-gold" />
                  <span className="text-sm font-medium">Điều hòa</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <ShieldCheck size={20} className="text-luxury-gold" />
                  <span className="text-sm font-medium">An toàn cao</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-28"
          >
            <div className="bg-luxury-dark p-10 rounded-3xl shadow-2xl text-white">
              <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                <Calendar size={24} className="text-luxury-gold" />
                Đặt phòng ngay
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Họ và tên</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Nhập tên của bạn"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Số điện thoại</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="09xx..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Số lượng khách</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                      <select 
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        className="w-full bg-white/10 border border-white/10 rounded-xl pl-12 pr-5 py-3 outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all text-white appearance-none"
                      >
                        <option value="1" className="bg-luxury-dark text-white">1 Khách</option>
                        <option value="2" className="bg-luxury-dark text-white">2 Khách</option>
                        <option value="3" className="bg-luxury-dark text-white">3 Khách</option>
                        <option value="4" className="bg-luxury-dark text-white">4+ Khách</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Ngày nhận phòng dự kiến</label>
                  <input 
                    type="date" 
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Ngày trả phòng dự kiến</label>
                  <input 
                    type="date" 
                    required
                    min={formData.checkIn}
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-luxury-gold/50 transition-all text-white"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex justify-between border-t border-white/10 pt-6 mb-6">
                    <span className="text-gray-400 uppercase tracking-widest text-xs py-2">
                      Tổng cộng dự kiến ({
                        Math.max(1, Math.round((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)))
                      } đêm)
                    </span>
                    <span className="text-3xl font-bold">
                      ${(roomType.price * Math.max(1, Math.round((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)))).toLocaleString()}
                    </span>
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <CreditCard size={20} className="group-hover:scale-110 transition-transform" />
                        Gửi yêu cầu đặt phòng
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-gray-500 mt-4 uppercase tracking-widest">
                    Không yêu cầu thanh toán trước
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
