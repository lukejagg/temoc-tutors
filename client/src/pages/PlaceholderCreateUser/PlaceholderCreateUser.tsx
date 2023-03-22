import { ChangeEvent, FormEvent, useState } from "react";
import { StudentCreationRequest } from "../../api/dbEndpointTypes";
import { createStudent } from "../../api/endpointRequests";

export const PlaceholderCreateUser: React.FC = () => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const placeholderAddStudent = () => {
    const newStudent: StudentCreationRequest = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
    };

    createStudent(newStudent);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewUsername(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    placeholderAddStudent();
  };

  return (
    <form>
      <input
        style={{
          border: "1px solid #ccc",
          padding: "8px",
        }}
        type="text"
        value={newUsername}
        onChange={handleUsernameChange}
      />
      <input
        type="text"
        value={newEmail}
        onChange={handleEmailChange}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
        }}
      />
      <input
        type="text"
        value={newPassword}
        onChange={handlePasswordChange}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
        }}
      />
      <button type="button" onClick={handleSubmit}>
        Add Student
      </button>
    </form>
  );
};
