// db.ts
const kv = await Deno.openKv();

export interface User {
  anonymous_id: string;
  user_id?: string;
  firstSeen: number;
  lastSeen: number;
  sessions: string[];
  hasSubmittedForm: boolean;
}

async function setValue(userId: string, field: string, value: string | number | boolean) {
  const key = [`users:${userId}:${field}`] as const;
  return await kv.set(key, value);
}

async function getValue(userId: string, field: string) {
  const key = [`users:${userId}:${field}`] as const;
  const result = await kv.get(key);
  return result.value;
}

export async function getOrCreateUser(anonymous_id: string): Promise<User> {
  const userId = `user:${anonymous_id}`;
  
  // Try to get existing user data
  const firstSeen = await getValue(userId, 'firstSeen');
  
  if (firstSeen) {
    // User exists, retrieve all fields
    return {
      anonymous_id,
      firstSeen: Number(firstSeen),
      lastSeen: Number(await getValue(userId, 'lastSeen')),
      sessions: JSON.parse((await getValue(userId, 'sessions') as string) || '[]'),
      hasSubmittedForm: Boolean(await getValue(userId, 'hasSubmittedForm')),
      user_id: (await getValue(userId, 'user_id') as string) || undefined
    };
  }

  // Create new user
  const now = Date.now();
  await setValue(userId, 'anonymous_id', anonymous_id);
  await setValue(userId, 'firstSeen', now);
  await setValue(userId, 'lastSeen', now);
  await setValue(userId, 'sessions', '[]');
  await setValue(userId, 'hasSubmittedForm', false);

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
  if (user.user_id) {
    await setValue(userId, 'user_id', user.user_id);
  }
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
  user.user_id = user_id;
  user.hasSubmittedForm = true;
  user.lastSeen = Date.now();
  await updateUser(user);
}