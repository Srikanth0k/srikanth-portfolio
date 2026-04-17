import React, { useState } from 'react';
import Landing from './pages/Landing';
import Chat from './pages/Chat';

export default function App() {
  const [page, setPage] = useState('landing');

  return page === 'landing'
    ? <Landing onEnter={() => setPage('chat')} />
    : <Chat />;
}