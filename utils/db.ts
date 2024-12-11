// db.ts
const kv = await Deno.openKv();

export interface User {
  anonymous_id: string;
  firstSeen: number;
  lastSeen: number;
  sessions: string[];
  hasSubmittedForm: boolean;
}

async function setValue(anonymous_id: string, field: string, value: string | number | boolean) {
  const key = [`users:${anonymous_id}:${field}`] as const;
  return await kv.set(key, value);
}

async function getValue(anonymous_id: string, field: string) {
  const key = [`users:${anonymous_id}:${field}`] as const;
  const result = await kv.get(key);
  return result.value;
}

export async function getOrCreateUser(anonymous_id: string): Promise<User> {
  
  // Try to get existing user data
  const firstSeen = await getValue(anonymous_id, 'firstSeen');
  
  if (firstSeen) {
    // User exists, retrieve all fields
    return {
      anonymous_id,
      firstSeen: Number(firstSeen),
      lastSeen: Number(await getValue(anonymous_id, 'lastSeen')),
      sessions: JSON.parse((await getValue(anonymous_id, 'sessions') as string) || '[]'),
      hasSubmittedForm: Boolean(await getValue(anonymous_id, 'hasSubmittedForm')),
    };
  }

  // Create new user
  const now = Date.now();
  await setValue(anonymous_id, 'anonymous_id', anonymous_id);
  await setValue(anonymous_id, 'firstSeen', now);
  await setValue(anonymous_id, 'lastSeen', now);
  await setValue(anonymous_id, 'sessions', '[]');
  await setValue(anonymous_id, 'hasSubmittedForm', false);

  return {
    anonymous_id,
    firstSeen: now,
    lastSeen: now,
    sessions: [],
    hasSubmittedForm: false
  };
}

export async function updateUser(user: User): Promise<void> {
  const userId = `user:${user.anonymous_id}`;
  await setValue(userId, 'lastSeen', user.lastSeen);
  await setValue(userId, 'sessions', JSON.stringify(user.sessions));
  await setValue(userId, 'hasSubmittedForm', user.hasSubmittedForm);
}

export async function recordSession(anonymous_id: string, session_id: string): Promise<void> {
  const user = await getOrCreateUser(anonymous_id);
  if (!user.sessions.includes(session_id)) {
    user.sessions.push(session_id);
    user.lastSeen = Date.now();
    await updateUser(user);
  }
}

export async function recordFormSubmission(anonymous_id: string, user_id: string): Promise<void> {
  console.log("Recording form submission in Deno KV for:", { anonymous_id, user_id });
  const user = await getOrCreateUser(anonymous_id);
  user.hasSubmittedForm = true;
  user.lastSeen = Date.now();
  await updateUser(user);
}