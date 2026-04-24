import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const roomService = {
  getRooms: () => api.get('/rooms'),
  getRoom: (id) => api.get(`/rooms/${id}`),
  getRoomTypes: () => api.get('/roomtypes'),
  getServices: () => api.get('/services'),
  // Xử lý đặt phòng
  getCustomers: () => api.get('/customers'),
  createCustomer: (data) => api.get('/customers').then(res => {
    // Để đơn giản, kiểm tra xem khách đã tồn tại chưa bằng tên
    const existing = res.data.find(c => c.name === data.name);
    if (existing) return { data: existing };
    return api.post('/customers', data);
  }),
  createBooking: (data) => api.post('/bookings', data),
};

export default api;
