import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bed, CreditCard, CheckCircle, Calendar, ArrowRight, X, Clock } from 'lucide-react';
import { authService } from '../../services/authService';

const UserStatsSection = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDetail, setActiveDetail] = useState(null); // 'bookings' or 'invoices' or null
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser && currentUser.id) {
        try {
          const response = await authService.getProfile(currentUser.id);
          setProfileData(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, []);

  if (!currentUser) return null;
  if (loading) return (
    <div className="container mx-auto px-6 py-10 flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold"></div>
    </div>
  );

  const { user, stats, bookings, paidInvoices } = profileData || { 
    user: currentUser, 
    stats: { BookingCount: 0, PaidInvoicesCount: 0 }, 
    bookings: [], 
    paidInvoices: [] 
  };

  const toggleDetail = (type) => {
    if (activeDetail === type) {
      setActiveDetail(null);
    } else {
      setActiveDetail(type);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-luxury-gold font-bold tracking-widest uppercase text-sm">Tổng quan tài khoản</span>
          <h2 className="text-4xl font-serif font-bold text-luxury-dark mt-2">Xin chào, {user.fullName}!</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* User Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-luxury-cream p-8 rounded-3xl shadow-sm border border-luxury-gold/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-luxury-dark rounded-2xl flex items-center justify-center text-white">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-bold text-luxury-dark">Thông tin cá nhân</h3>
                <p className="text-gray-500 text-sm">Quản lý thông tin của bạn</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-luxury-gold/5">
                <span className="text-gray-500 text-sm">Họ và tên</span>
                <span className="font-medium text-luxury-dark text-right">{user.fullName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxury-gold/5">
                <span className="text-gray-500 text-sm">Email</span>
                <span className="font-medium text-luxury-dark text-right truncate ml-4" title={user.email}>{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-luxury-gold/5">
                <span className="text-gray-500 text-sm">Tên đăng nhập</span>
                <span className="font-medium text-luxury-dark text-right">{user.username}</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bookings Stat */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`p-8 rounded-3xl shadow-xl shadow-luxury-dark/5 border transition-all flex flex-col justify-between cursor-pointer ${
                activeDetail === 'bookings' ? 'bg-indigo-600 text-white border-indigo-600 scale-[1.02]' : 'bg-white border-gray-50'
              }`}
              onClick={() => toggleDetail('bookings')}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  activeDetail === 'bookings' ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  <Bed size={24} />
                </div>
                <h3 className={`text-4xl font-bold ${activeDetail === 'bookings' ? 'text-white' : 'text-luxury-dark'}`}>
                  {stats.BookingCount}
                </h3>
                <p className={`font-medium ${activeDetail === 'bookings' ? 'text-indigo-100' : 'text-gray-500'}`}>Phòng đã đặt</p>
              </div>
              <div className={`mt-8 flex items-center font-bold text-sm group ${
                activeDetail === 'bookings' ? 'text-white' : 'text-indigo-600'
              }`}>
                {activeDetail === 'bookings' ? 'Đang hiển thị chi tiết' : 'Xem chi tiết phòng nghỉ'}
                <ArrowRight size={16} className={`ml-2 transition-transform ${activeDetail === 'bookings' ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </div>
            </motion.div>

            {/* Invoices Stat */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`p-8 rounded-3xl shadow-xl shadow-luxury-dark/5 border transition-all flex flex-col justify-between cursor-pointer ${
                activeDetail === 'invoices' ? 'bg-emerald-600 text-white border-emerald-600 scale-[1.02]' : 'bg-white border-gray-50'
              }`}
              onClick={() => toggleDetail('invoices')}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  activeDetail === 'invoices' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <CreditCard size={24} />
                </div>
                <h3 className={`text-4xl font-bold ${activeDetail === 'invoices' ? 'text-white' : 'text-luxury-dark'}`}>
                  {stats.PaidInvoicesCount}
                </h3>
                <p className={`font-medium ${activeDetail === 'invoices' ? 'text-emerald-100' : 'text-gray-500'}`}>Hóa đơn đã thanh toán</p>
              </div>
              <div className={`mt-8 flex items-center font-bold text-sm group ${
                activeDetail === 'invoices' ? 'text-white' : 'text-emerald-600'
              }`}>
                {activeDetail === 'invoices' ? 'Đang hiển thị lịch sử' : 'Xem lịch sử thanh toán'}
                <ArrowRight size={16} className={`ml-2 transition-transform ${activeDetail === 'invoices' ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Details Section */}
        <AnimatePresence mode="wait">
          {activeDetail === 'bookings' && (
            <motion.div 
              key="bookings-detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200"
            >
              <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-white">
                <h3 className="font-bold text-xl text-luxury-dark flex items-center gap-2">
                  <Bed className="text-indigo-600" size={24} />
                  Chi tiết danh sách phòng đã đặt
                </h3>
                <button onClick={() => setActiveDetail(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100/50 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                      <th className="px-8 py-4">Mã đơn</th>
                      <th className="px-8 py-4">Loại phòng / Số phòng</th>
                      <th className="px-8 py-4">Thời gian lưu trú</th>
                      <th className="px-8 py-4">Tổng tiền</th>
                      <th className="px-8 py-4 text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.length > 0 ? bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-8 py-5 font-bold text-luxury-dark">#BK-{booking.id}</td>
                        <td className="px-8 py-5">
                          <div>
                            <p className="font-bold text-luxury-dark leading-none">{booking.roomTypeName}</p>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Phòng {booking.roomCode}</p>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Calendar size={14} className="text-luxury-gold" />
                            {new Date(booking.checkIn).toLocaleDateString('vi-VN')} - {new Date(booking.checkOut).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-8 py-5 font-bold text-luxury-dark">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalPrice)}
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                            booking.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-8 py-10 text-center text-gray-400 font-medium italic">
                          Bạn chưa có đơn đặt phòng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeDetail === 'invoices' && (
            <motion.div 
              key="invoices-detail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200"
            >
              <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-white">
                <h3 className="font-bold text-xl text-luxury-dark flex items-center gap-2">
                  <CreditCard className="text-emerald-600" size={24} />
                  Lịch sử thanh toán hóa đơn
                </h3>
                <button onClick={() => setActiveDetail(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100/50 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                      <th className="px-8 py-4">Mã hóa đơn</th>
                      <th className="px-8 py-4">Phòng</th>
                      <th className="px-8 py-4">Ngày thanh toán</th>
                      <th className="px-8 py-4 text-right">Tổng tiền</th>
                      <th className="px-8 py-4 text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paidInvoices.length > 0 ? paidInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-8 py-5 font-bold text-luxury-dark">#INV-{invoice.id}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <Bed size={14} className="text-luxury-gold" />
                            <span className="font-medium text-gray-700">{invoice.roomName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock size={14} className="text-emerald-500" />
                            {new Date(invoice.paymentDate).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right font-bold text-luxury-dark">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(invoice.totalAmount)}
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                            Đã thanh toán
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-8 py-10 text-center text-gray-400 font-medium italic">
                          Chưa có lịch sử thanh toán nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UserStatsSection;
