
const kv = await Deno.openKv();

export interface User {
  anonymous_id: string;
  firstSeen: number;
  lastSeen: number;
  visits: number;
  lastSession: string;
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
export async function getOrCreateUser(session_id: string): Promise<User> {
  try {
    // Attempt to retrieve user data
    const sessionId = await getValue([`users:${session_id}:lastSession`]);
    if (sessionId) {
      return {
        anonymous_id : String(await getValue([`users:${session_id}:anonymous_id`])),
        lastSession: String(sessionId),
        firstSeen: Number(await getValue([`users:${session_id}:firstSeen`])),
        lastSeen: Number(await getValue([`users:${session_id}:lastSeen`])),
        visits: Number(await getValue([`users:${session_id}:visits`])),
      };
    }
    // Create a new user if not found
    const now = Date.now();
    const anonymous_id = crypto.randomUUID();
    await kv.atomic()
      .set([`users:${session_id}:anonymous_id`], anonymous_id)
      .set([`users:${session_id}:lastSession`], session_id)
      .set([`users:${session_id}:firstSeen`], now)
      .set([`users:${session_id}:lastSeen`], now)
      .commit();

    return {
      anonymous_id,
      lastSession: session_id,
      firstSeen: now,
      lastSeen: now,
      visits: 1,
    };
  } catch (error) {
    console.error(`Error in getOrCreateUser for session_id: ${session_id}`, error);
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
      .set([`users:${user.anonymous_id}:visits`], user.visits)
      .commit();
  } catch (error) {
    console.error(`Error updating user: ${user.anonymous_id}`, error);
    throw new Error("Failed to update user.");
  }
}

/**
 * Record a session for a user.
 */
export async function recordSession(session_id: string): Promise<void> {
  try {
    const user = await getOrCreateUser(session_id);
    if (user.visits > 1) {
      user.lastSeen = Date.now();
      user.visits += 1;
      await updateUser(user);
    }
  } catch (error) {
    console.error(`Error recording session for: ${session_id}`, error);
    throw new Error("Failed to record session.");
  }
}