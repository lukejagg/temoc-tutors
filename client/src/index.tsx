import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import App from './App';
import SampleCalendarApp from './components/calendar/calendar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const customEvents = [
  {
    title: 'Custom Event 1',
    start: '2023-03-01',
    end: '2023-03-03'
  },
  {
    title: 'Custom Event 2',
    start: '2023-03-07',
    end: '2023-03-09'
  }
];

root.render(
  <React.StrictMode>
    <div className="container">
      <div className="app">
        <App />
      </div>
      <SampleCalendarApp events={customEvents} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
