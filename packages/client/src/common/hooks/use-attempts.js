import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAttempt, fetchAllAttempts, fetchAttemptsByTopic } from '@services/attempts';
import { qk } from '@lib/query-keys';

export function useAllAttempts(initialData) {
  return useQuery({
    queryKey: qk.attempts.list(),
    queryFn: fetchAllAttempts,
    initialData,
  });
}

export function useAttemptsByTopic(topicId) {
  return useQuery({
    queryKey: qk.attempts.byTopic(topicId),
    queryFn: () => fetchAttemptsByTopic(topicId),
    enabled: Boolean(topicId),
  });
}

export function useCreateAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttempt,
    onMutate: async (newAttempt) => {
      // Optimistic update: list'ga darhol qo'shamiz, server javobini kutmasdan.
      await queryClient.cancelQueries({ queryKey: qk.attempts.all });

      const previous = queryClient.getQueryData(qk.attempts.list());

      const optimisticEntity = {
        id: `temp-${Date.now()}`,
        ...newAttempt,
        topic: newAttempt.topic ? { id: newAttempt.topic } : null,
      };

      queryClient.setQueryData(qk.attempts.list(), (old = []) => [optimisticEntity, ...old]);

      return { previous };
    },
    onError: (err, _vars, context) => {
      // Rollback xato bo'lsa
      if (context?.previous) {
        queryClient.setQueryData(qk.attempts.list(), context.previous);
      }
    },
    onSettled: () => {
      // Server javobi keldi — fresh data olamiz
      queryClient.invalidateQueries({ queryKey: qk.attempts.all });
    },
  });
}
