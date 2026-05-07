import { useQuery } from '@tanstack/react-query';
import { fetchTopics, fetchTopicBySlug } from '@services/topics';
import { qk } from '@lib/query-keys';

export function useTopics(filters = {}, initialData) {
  return useQuery({
    queryKey: qk.topics.list(filters),
    queryFn: () => fetchTopics(filters),
    initialData,
  });
}

export function useTopicBySlug(slug, initialData) {
  return useQuery({
    queryKey: qk.topics.detail(slug),
    queryFn: () => fetchTopicBySlug(slug),
    enabled: Boolean(slug),
    initialData,
  });
}
