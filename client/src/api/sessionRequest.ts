export async function requestSessionID() {
  fetch('http://localhost:8000/session', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ sessionID: '' }),
  })
    .then((response) => response.json())
    .then((data) => localStorage.setItem('sessionID', data))
    .then(() => console.log("Session ID Generated"));
  }