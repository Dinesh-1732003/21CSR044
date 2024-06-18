import React, { useState } from 'react';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NjkxOTQ4LCJpYXQiOjE3MTg2OTE2NDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE1OWUxMGZlLTYwNzUtNDEzZS1hNmViLTg2NjM5MzMyYThjMyIsInN1YiI6Im1haWx0b2RpbmVzaGt2QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6Inplbk1hcnQiLCJjbGllbnRJRCI6ImE1OWUxMGZlLTYwNzUtNDEzZS1hNmViLTg2NjM5MzMyYThjMyIsImNsaWVudFNlY3JldCI6IkNwdmFjeUpYcFpET2hiaGciLCJvd25lck5hbWUiOiJEaW5lc2ggSyIsIm93bmVyRW1haWwiOiJtYWlsdG9kaW5lc2hrdkBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMUNTUjA0NCJ9.2oWg4Rvtv_RWpKkSmpMIdOUqnhY_il1Bl619rYNXn_w';

const App = () => {
  const [numberId, setNumberId] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchApiResponse = () => {
    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
      setError('Invalid number ID');
      return;
    }

    setLoading(true);
    setError('');

    fetch('http://20.244.56.144/test/fibo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setResponseData(data);
    })
    .catch(error => {
      setError('Failed to fetch data');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <h1>Average Calculator Microservice</h1>
      <input
        type="text"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
        placeholder="Enter number ID (p, f, e, r)"
      />
      <button className="button" onClick={fetchApiResponse} disabled={loading}>
        Fetch Data
      </button>
      {loading && <p id="loading">Loading...</p>}
      {error && <div className="error">{error}</div>}
      {responseData && (
        <div className="response-display">
          <h2>Results</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
