// utils/db/kv.ts
const kv = await Deno.openKv();

export interface User {
  anonymous_id: string;
  auth_id?: string;  // SQLite user ID when authenticated
  firstSeen: number;
  lastSeen: number;
  visits: number;
  lastSession: string;
}

export async function getValue(key: string[]): Promise<unknown | null> {
  try {
    const result = await kv.get(key);
    return result.value || null;
  } catch (error) {
    console.error(`Error getting key: ${key}`, error);
    throw new Error("Failed to get value from KV store.");
  }
}

export async function getOrCreateUser(session_id: string, auth_id?: string): Promise<User> {
  try {
    // Attempt to retrieve user data
    const sessionId = await getValue([`users:${session_id}:lastSession`]);
    if (sessionId) {
      const user = {
        anonymous_id: String(await getValue([`users:${session_id}:anonymous_id`])),
        auth_id: auth_id || String(await getValue([`users:${session_id}:auth_id`])),
        lastSession: String(sessionId),
        firstSeen: Number(await getValue([`users:${session_id}:firstSeen`])),
        lastSeen: Number(await getValue([`users:${session_id}:lastSeen`])),
        visits: Number(await getValue([`users:${session_id}:visits`])),
      };

      // Update auth_id if provided
      if (auth_id && auth_id !== user.auth_id) {
        await kv.set([`users:${session_id}:auth_id`], auth_id);
        user.auth_id = auth_id;
      }

      return user;
    }

    // Create new user
    const now = Date.now();
    const anonymous_id = crypto.randomUUID();

    await kv.atomic()
      .set([`users:${session_id}:anonymous_id`], anonymous_id)
      .set([`users:${session_id}:lastSession`], session_id)
      .set([`users:${session_id}:firstSeen`], now)
      .set([`users:${session_id}:lastSeen`], now)
      .set([`users:${session_id}:visits`], 1)
      .commit();

    if (auth_id) {
      await kv.set([`users:${session_id}:auth_id`], auth_id);
    }

    return {
      anonymous_id,
      auth_id,
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

export async function updateUser(user: User): Promise<void> {
  try {
    await kv.atomic()
      .set([`users:${user.lastSession}:lastSeen`], user.lastSeen)
      .set([`users:${user.lastSession}:visits`], user.visits)
      .commit();
  } catch (error) {
    console.error(`Error updating user: ${user.anonymous_id}`, error);
    throw new Error("Failed to update user.");
  }
}

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