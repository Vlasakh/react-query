import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

import wait from '../../utils/wait';

import { Person } from './People';

import '../../App.css';

const INITIAL_URL = 'https://swapi.dev/api/people/';

const fetchUrl = async (url) => await wait(2000).then(() => fetch(url).json());

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery(
    'sw-people',
    ({ pageParam = INITIAL_URL }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined },
  );

  if (isLoading) return <div className={'loading'}>Loading . . .</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map((pageData) =>
        pageData.results.map(({ name, hairColor, eyeColor }) => (
          <Person key={name} name={name} hairColor={hairColor} eyeColor={eyeColor} />
        )),
      )}
    </InfiniteScroll>
  );
}
export default InfinitePeople;
