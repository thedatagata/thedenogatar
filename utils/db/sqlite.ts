// utils/db/sqlite.ts
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";


// Ensure data directory exists
try {
  await Deno.mkdir("./data");
} catch (error) {
  if (!(error instanceof Deno.errors.AlreadyExists)) {
    throw error;
  }
}

export const db = new DB("./data/auth.db");

// Initialize the users table
db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

export interface DBUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: number;
}

export async function createUser(email: string, passwordHash: string): Promise<DBUser> {
  const id = crypto.randomUUID();
  const now = Date.now();

  db.query(
    "INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
    [id, email, passwordHash, now]
  );

  return {
    id,
    email,
    password_hash: passwordHash,
    created_at: now
  };
}

export function getUserByEmail(email: string): DBUser | null {
  const result = db.query<[string, string, string, number]>(
    "SELECT id, email, password_hash, created_at FROM users WHERE email = ?",
    [email]
  );

  if (!result.length) return null;

  const [id, userEmail, passwordHash, createdAt] = result[0];
  
  return {
    id,
    email: userEmail,
    password_hash: passwordHash,
    created_at: createdAt
  };
}

export function getUserById(id: string): DBUser | null {
  const result = db.query<[string, string, string, number]>(
    "SELECT id, email, password_hash, created_at FROM users WHERE id = ?",
    [id]
  );

  if (!result.length) return null;

  const [userId, email, passwordHash, createdAt] = result[0];
  
  return {
    id: userId,
    email,
    password_hash: passwordHash,
    created_at: createdAt
  };
}