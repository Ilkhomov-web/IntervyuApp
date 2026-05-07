import { useQuery } from '@tanstack/react-query';
import { fetchStudyPlans } from '@services/study-plans';
import { qk } from '@lib/query-keys';

export function useStudyPlans(initialData) {
  return useQuery({
    queryKey: qk.studyPlans.list(),
    queryFn: fetchStudyPlans,
    initialData,
  });
}
