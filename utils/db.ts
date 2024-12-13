
const kv = await Deno.openKv();

export interface User {
  anonymous_id: string;
  firstSeen: number;
  lastSeen: number;
  sessions: string[];
  hasSubmittedForm: boolean;
}

/**
 * Set a value in the KV store.
 */
async function setValue(key: readonly string[], value: unknown): Promise<void> {
  try {
    await kv.set(key, value);
  } catch (error) {
    console.error(`Error setting key: ${key}`, error);
    throw new Error("Failed to set value in KV store.");
  }
}

/**
 * Get a value from the KV store.
 */
async function getValue(key: readonly string[]): Promise<unknown | null> {
  try {
    const result = await kv.get(key);
    return result?.value || null;
  } catch (error) {
    console.error(`Error getting key: ${key}`, error);
    throw new Error("Failed to get value from KV store.");
  }
}

/**
 * Create or retrieve a user from the KV store.
 */
export async function getOrCreateUser(anonymous_id: string): Promise<User> {
  try {
    // Attempt to retrieve user data
    const firstSeen = await getValue([`users:${anonymous_id}:firstSeen`]);
    if (firstSeen) {
      return {
        anonymous_id,
        firstSeen: Number(firstSeen),
        lastSeen: Number(await getValue([`users:${anonymous_id}:lastSeen`])),
        sessions: JSON.parse((await getValue([`users:${anonymous_id}:sessions`]) as string) || "[]"),
        hasSubmittedForm: Boolean(await getValue([`users:${anonymous_id}:hasSubmittedForm`])),
      };
    }

    // Create a new user if not found
    const now = Date.now();
    await kv.atomic()
      .set([`users:${anonymous_id}:anonymous_id`], anonymous_id)
      .set([`users:${anonymous_id}:firstSeen`], now)
      .set([`users:${anonymous_id}:lastSeen`], now)
      .set([`users:${anonymous_id}:sessions`], "[]")
      .set([`users:${anonymous_id}:hasSubmittedForm`], false)
      .commit();

    return {
      anonymous_id,
      firstSeen: now,
      lastSeen: now,
      sessions: [],
      hasSubmittedForm: false,
    };
  } catch (error) {
    console.error(`Error in getOrCreateUser for anonymous_id: ${anonymous_id}`, error);
    throw new Error("Failed to get or create user.");
  }
}

/**
 * Update user data in the KV store.
 */
export async function updateUser(user: User): Promise<void> {
  try {
    await kv.atomic()
      .set([`users:${user.anonymous_id}:lastSeen`], user.lastSeen)
      .set([`users:${user.anonymous_id}:sessions`], JSON.stringify(user.sessions))
      .set([`users:${user.anonymous_id}:hasSubmittedForm`], user.hasSubmittedForm)
      .commit();
  } catch (error) {
    console.error(`Error updating user: ${user.anonymous_id}`, error);
    throw new Error("Failed to update user.");
  }
}

/**
 * Record a session for a user.
 */
export async function recordSession(anonymous_id: string, session_id: string): Promise<void> {
  try {
    const user = await getOrCreateUser(anonymous_id);
    if (!user.sessions.includes(session_id)) {
      user.sessions.push(session_id);
      user.lastSeen = Date.now();
      await updateUser(user);
    }
  } catch (error) {
    console.error(`Error recording session for anonymous_id: ${anonymous_id}, session_id: ${session_id}`, error);
    throw new Error("Failed to record session.");
  }
}

/**
 * Record a form submission for a user.
 */
export async function recordFormSubmission(anonymous_id: string): Promise<void> {
  try {
    const user = await getOrCreateUser(anonymous_id);
    user.hasSubmittedForm = true;
    user.lastSeen = Date.now();
    await updateUser(user);
  } catch (error) {
    console.error(`Error recording form submission for anonymous_id: ${anonymous_id}`, error);
    throw new Error("Failed to record form submission.");
  }
}
