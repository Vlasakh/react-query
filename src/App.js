import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Passengers from './components/Passenger';
import PassengerID from './components/PassengerID';

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
        <Passengers />
        <PassengerID />
      </QueryClientProvider>
    </div>
  );
}

export default App;
