import { useState, ChangeEvent, FormEvent } from "react";

import TutorForm from './components/database/tutor-form';
import { Tutor } from './components/database/types';

import './App.css';

const App: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  const handleCreateTutor = (tutor: Tutor) => {
    setTutors((prevTutors) => [...prevTutors, tutor]);
  };

  return (
    <div>
      <h1>Tutor List</h1>
      <ul>
        {tutors.map((tutor) => (
          <li key={tutor.id}>
            {tutor.id}: {tutor.aboutMe}
          </li>
        ))}
      </ul>
      <h2>Create Tutor</h2>
      <TutorForm onSubmit={handleCreateTutor} />
    </div>
  );
};

export default App;