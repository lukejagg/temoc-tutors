import React, { useState } from 'react';
import { Tutor } from './types';

interface TutorFormProps {
    onSubmit: (tutor: Tutor) => void;
}

const TutorForm: React.FC<TutorFormProps> = ({ onSubmit }) => {
    const [subjects, setSubjects] = useState<string[]>([]);
    const [aboutMe, setAboutMe] = useState<string>('');
    const [availableHours, setAvailableHours] = useState<Uint8Array[]>([]);
    const [profilePicture, setProfilePicture] = useState<Uint8Array | null>(null);

    const handleAvailableHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const newAvailableHours = files.map((file) => {
            return new Promise<Uint8Array>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const uint8Array = new Uint8Array(arrayBuffer);
                    resolve(uint8Array);
                };
                reader.onerror = (err) => {
                    reject(err);
                };
                reader.readAsArrayBuffer(file);
            });
        });
        Promise.all(newAvailableHours).then((values) => {
            setAvailableHours((prevAvailableHours) => prevAvailableHours.concat(values));
        });
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);
                setProfilePicture(uint8Array);
            };
            reader.onerror = (err) => {
                console.error('Error reading file:', err);
            };
            reader.readAsArrayBuffer(file);
        } else {
            setProfilePicture(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            subjects,
            aboutMe,
            availableHours,
            profilePicture,
        };

        try {
            const response = await fetch('/tutors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const tutor = await response.json();
                onSubmit(tutor);
                setSubjects([]);
                setAboutMe('');
                setAvailableHours([]);
                setProfilePicture(null);
            } else {
                console.error('Failed to create tutor:', response.statusText);
            }
        } catch (err) {
            console.error('Error creating tutor:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Subjects:
                <input type="text" value={subjects.join(',')} onChange={(e) => setSubjects(e.target.value.split(','))} />
            </label>
            <br />
            <label>
                About me:
                <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
            </label>
            <br />
            <label>
                Available hours:
                <input type="file" multiple onChange={handleAvailableHoursChange} />
            </label>
            <br />
            <label>
                Profile picture:
                <input type="file" onChange={handleProfilePictureChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TutorForm;