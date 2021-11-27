import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

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

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <button style={{ position: 'absolute', top: 10, right: 10 }} onClick={() => setTime(+new Date())}>
          R
        </button>
        <Router>
          <div>
            <ul>
              {ROUTES_MAP.map(([key, { name }]) => (
                <li key={key}>
                  <Link to={`/${key}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Switch>
            {ROUTES_MAP.map(([key, { component: Component }]) => (
              <Route key={key} path={`/${key}`}>
                <Component />
              </Route>
            ))}
          </Switch>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
