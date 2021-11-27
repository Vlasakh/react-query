import { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useHistory } from 'react-router-dom';

import Main from './components/Main';
import PassengersPage from './components/Passengers/PassengersPage';
import PostsPage from './components/Posts/PostsPage';
import InfiniteSWAPIPage from './components/InfiniteSWAPI/InfiniteSWAPIPage';

import './App.css';

const queryClient = new QueryClient();

const ROUTES = new Map([
  ['posts', { name: 'Posts', component: PostsPage }],
  ['passengers', { name: 'Passengers', component: PassengersPage }],
  ['infinite-swapi', { name: 'Infinite SWAPI', component: InfiniteSWAPIPage }],
]);
const ROUTES_MAP = Array.from(ROUTES.entries());

function App() {
  const [, setTime] = useState(+new Date());
  const history = useHistory();
  const index = useMemo(
    () => ROUTES_MAP.findIndex(([path]) => `/${path}` === history.location.pathname),
    [history.location.pathname],
  );

  const handleChange = (value) => {
    history.push(`/${ROUTES_MAP[value][0]}`);
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <button style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => setTime(+new Date())}>
          R
        </button>

        <Main defaultValue={index !== -1 ? index + 1 : 0} routesMap={ROUTES_MAP} onChange={handleChange} />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
