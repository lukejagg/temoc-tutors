export async function requestSessionID() {
  const url = 'http://localhost:8000/session';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionID: '' }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch session ID: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem('sessionID', data);
  } catch (error) {
    console.error(error);
  }
}