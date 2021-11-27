import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import PassengersPage from './components/Passengers/PassengersPage';
import PostsPage from './components/Posts/PostsPage';

import './App.css';

const queryClient = new QueryClient();

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
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/passengers">Passengers</Link>
              </li>{' '}
              <li>
                <Link to="/infinite-swapi">Infinite SWAPI</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path="/posts">
              <PostsPage />
            </Route>
            <Route path="/passengers">
              <PassengersPage />
            </Route>
          </Switch>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
