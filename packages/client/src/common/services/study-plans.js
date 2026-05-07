import api, { unwrap } from '@utils/api';

export async function fetchStudyPlans() {
  const response = await api.get('/study-plans', {
    params: { populate: 'track', sort: 'durationDays:asc' },
  });
  return unwrap(response);
}
