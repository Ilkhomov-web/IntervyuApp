import api, { unwrap } from '@utils/api';

export async function createAttempt(payload) {
  const response = await api.post('/attempts', { data: payload });
  return unwrap(response);
}

export async function fetchAttemptsByTopic(topicId) {
  const response = await api.get('/attempts', {
    params: {
      filters: { topic: { id: { $eq: topicId } } },
      sort: 'attemptedAt:desc',
      pagination: { pageSize: 100 },
    },
  });
  return unwrap(response);
}

export async function fetchAllAttempts() {
  const response = await api.get('/attempts', {
    params: {
      populate: ['topic'],
      sort: 'attemptedAt:desc',
      pagination: { pageSize: 500 },
    },
  });
  return unwrap(response);
}
