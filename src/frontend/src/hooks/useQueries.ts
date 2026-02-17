import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Progress } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSaveProgress() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (progress: Progress) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveProgress(progress);
    },
  });
}

export function useGetProgress() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Progress | null>({
    queryKey: ['progress'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getProgress();
      } catch (error) {
        // Return null if no progress exists yet
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
