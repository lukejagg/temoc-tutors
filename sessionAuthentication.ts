import { v4 as uuidv4 } from 'uuid';

export function createSessionID() {
  const sessionId = uuidv4();

  return sessionId;
}