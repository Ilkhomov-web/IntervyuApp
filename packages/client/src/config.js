export const PRODUCT_NAME = 'Intervyu Platforma';
export const PRODUCT_DESCRIPTION = 'Frontend Senior intervyuga tayyorgarlik';

export const PRODUCT_URL = 'http://localhost:3000';

export const DEFAULT_TIMEZONE = 'Asia/Tashkent';

export const routes = {
  home: '/',
  topics: '/topics',
  topic: (slug) => `/topics/${slug}`,
  quiz: (slug) => `/quiz/${slug}`,
  dashboard: '/dashboard',
  studyPlans: '/study-plans',
};

// Bitta foydalanuvchi (shaxsiy platforma uchun).
// Strapi'ga attempt yozganda ishlatamiz.
export const DEFAULT_USER_ID = 1;

export const DIFFICULTY_LABELS = {
  easy: 'Oson',
  medium: "O'rta",
  hard: 'Murakkab',
};

export const DIFFICULTY_COLORS = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
};

export const QUESTION_TYPE_LABELS = {
  multiple_choice: 'Variantli',
  true_false: "To'g'ri/Noto'g'ri",
  short_answer: 'Qisqa javob',
  code_output: 'Kod natijasi',
  open_ended: 'Ochiq savol',
};
