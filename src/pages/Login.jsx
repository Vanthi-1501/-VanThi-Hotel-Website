import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success(`Chào mừng trở lại, ${response.data.user.fullName}!`);
      navigate('/');
      window.location.reload(); // Quick way to update navbar
    } catch (error) {
      toast.error(error.response?.data || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-cream flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-luxury-dark p-10 text-white text-center">
          <h2 className="text-3xl font-serif font-bold mb-2">Đăng Nhập</h2>
          <p className="text-gray-400 text-sm">Chào mừng bạn quay lại với VanThi Luxury</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Tên đăng nhập</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
              <input 
                type="text" 
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-100 focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/5 outline-none transition-all"
                placeholder="Nhập tên đăng nhập"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-100 focus:border-luxury-gold focus:ring-4 focus:ring-luxury-gold/5 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-dark hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Đăng Nhập
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-luxury-gold font-bold hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
