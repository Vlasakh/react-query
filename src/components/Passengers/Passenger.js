import { useState } from 'react';
import { useQuery } from 'react-query';

const fetchPassengers = async (page) =>
  await fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`).then((res) => res.json());

function Passengers() {
  const [page, setPage] = useState(0);
  const { isLoading, error, data, isSuccess } = useQuery(['passengers', page], () => fetchPassengers(page), {
    keepPreviousData: false,
  });
  return (
    <div>
      <button onClick={() => setPage((p) => --p)}>prev</button>
      <button onClick={() => setPage((p) => ++p)}>next</button>
      {isSuccess &&
        data.data.map((item) => (
          <div key={item._id}>
            <p>{item.name}</p>
            <p>{item._id}</p>
          </div>
        ))}
      {isLoading && <p>Loading..</p>}
      {error && <p>Error occurred!</p>}
    </div>
  );
}

export default Passengers;
