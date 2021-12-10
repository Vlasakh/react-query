import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import wait from '../../../utils/wait';
import { filterByTreatment } from '../utils';

async function getStaff(): Promise<Staff[]> {
  await wait(1500);
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  const [filter, setFilter] = useState('all');
  const selectFn = useCallback((data) => filterByTreatment(data, filter), [filter]);
  const { data = [] } = useQuery(queryKeys.staff, getStaff, { select: filter === 'all' ? undefined : selectFn });

  const staff = data;

  return { staff, filter, setFilter };
}
