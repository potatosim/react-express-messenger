import { useEffect, useState } from 'react';
import { getMessage } from './services/getMessage.query';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMessage({
      onError: (err) => console.log(err.message),
      onSuccess: (data) => setMessage(data),
    });
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <p>{message}</p>
    </>
  );
}

export default App;
