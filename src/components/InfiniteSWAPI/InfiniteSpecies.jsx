import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

import wait from '../../utils/wait';
import { Species } from './Species';

import '../../App.css';

const INITIAL_URL = 'https://swapi.dev/api/species/';

const fetchUrl = async (url) => await wait(1000).then(() => fetch(url).then((r) => r.json()));

export function InfiniteSpecies() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = INITIAL_URL }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined },
  );

  if (isLoading) return <div className={'loading'}>Loading . . .</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div className={'loading'}>Loading . . .</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) =>
          pageData.results.map(({ name, language, averageLifespan }) => (
            <Species key={name} name={name} language={language} averageLifespan={averageLifespan} />
          )),
        )}
      </InfiniteScroll>
    </>
  );
}
