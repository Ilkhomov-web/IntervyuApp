// Markaziy query-keys ro'yxati.
// Sabab: invalidateQueries chaqirganda typo qilmaslik uchun.
// Senior pattern: hierarchical keys (qism o'chirilsa, butun shox invalidate bo'ladi).

export const qk = {
  studyPlans: {
    all: ['study-plans'],
    list: () => [...qk.studyPlans.all, 'list'],
  },
  topics: {
    all: ['topics'],
    list: (filters = {}) => [...qk.topics.all, 'list', filters],
    detail: (slug) => [...qk.topics.all, 'detail', slug],
  },
  attempts: {
    all: ['attempts'],
    list: () => [...qk.attempts.all, 'list'],
    byTopic: (topicId) => [...qk.attempts.all, 'by-topic', topicId],
  },
  reviewSchedule: {
    all: ['review-schedule'],
    due: () => [...qk.reviewSchedule.all, 'due'],
  },
};
