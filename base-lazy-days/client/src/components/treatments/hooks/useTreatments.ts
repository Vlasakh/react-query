import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import wait from '../../../utils/wait';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  await wait(2000);
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const { data = [] } = useQuery(queryKeys.treatments, getTreatments);

  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
