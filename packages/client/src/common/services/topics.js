import api, { unwrap } from '@utils/api';

export async function fetchTopics({ trackSlug, levelSlug, minImportance } = {}) {
  const filters = {};
  if (trackSlug) filters.track = { slug: { $eq: trackSlug } };
  if (levelSlug) filters.level = { slug: { $eq: levelSlug } };
  if (minImportance) filters.importance = { $gte: minImportance };

  const response = await api.get('/topics', {
    params: {
      populate: ['track', 'level'],
      filters,
      sort: ['level.order:asc', 'importance:desc', 'order:asc'],
      pagination: { pageSize: 200 },
    },
  });

  return unwrap(response);
}

export async function fetchTopicBySlug(slug) {
  const response = await api.get('/topics', {
    params: {
      filters: { slug: { $eq: slug } },
      populate: ['track', 'level', 'questions', 'practicalTasks', 'prerequisites'],
    },
  });
  const items = unwrap(response);
  return Array.isArray(items) ? items[0] : null;
}
