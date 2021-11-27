import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

import wait from '../../utils/wait';

const INITIAL_URL = 'https://swapi.dev/api/species/';

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  return <InfiniteScroll />;
}
