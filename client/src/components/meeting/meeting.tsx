import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from "../../components/navbar/navbar";
import './meeting.css';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const Meeting: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id1 = searchParams.get('id1') || '';
    const id2 = searchParams.get('id2') || '';

    const roomName = `comet-classroom-${id1}-${id2}`;
    const password = `${id1}-${id2}`;
    const parentNode = containerRef.current;

    if (parentNode && window.JitsiMeetExternalAPI) {
      const jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        parentNode,
        width: '100%',
        height: '100%',
      });

      jitsi.addEventListener('videoConferenceJoined', () => {
        jitsi.executeCommand('password', password);
      });

      return () => {
        jitsi.dispose();
      };
    }
  }, [location]);

  return (
    <div className="meeting-container">
      <Navbar/>
      <div ref={containerRef} className="meeting-content" />
    </div>
  );
};

export default Meeting;
