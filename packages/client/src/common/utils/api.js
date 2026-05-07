import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Strapi `data` envelope'idan kontentni chiqaruvchi yordamchi.
// Strapi 5'da response { data: [...], meta: {...} } shaklida keladi,
// har element { id, ...attributes } strukturasiga ega.
export const unwrap = (response) => {
  if (!response?.data) return null;
  if (Array.isArray(response.data.data)) return response.data.data;
  return response.data.data || response.data;
};

export const unwrapMeta = (response) => response?.data?.meta || null;

export default api;
