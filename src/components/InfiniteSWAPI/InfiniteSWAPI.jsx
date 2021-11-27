import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import wait from '../../utils/wait';

const MAX_POST_PAGE = 10;
const POSTS_QUERY_KEY = 'posts';

async function fetchPosts(pageNum) {
  const response = await wait(2000).then(() =>
    // fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`),
    fetch(`http://localhost:3334/posts?_limit=10&_page=${pageNum}`),
  );
  return response.json();
}

export function InfiniteSWAPI() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < MAX_POST_PAGE) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery([POSTS_QUERY_KEY, nextPage], () => fetchPosts(nextPage));
    }
  }, [currentPage, queryClient]);

  const { data, isError, error, isLoading } = useQuery([POSTS_QUERY_KEY, currentPage], () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  });
  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= MAX_POST_PAGE}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
    </>
  );
}
export default InfiniteSWAPI;
