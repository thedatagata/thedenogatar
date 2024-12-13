
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const db = new DB("users.db");

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
}

export async function createUser(username: string, email: string, password: string): Promise<User> {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const result = db.query<[number, string, string, string]>(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?) RETURNING id, username, email, password_hash",
      [username, email, passwordHash],
    );
    
    const [id, uname, mail, hash] = result[0];
    return { id, username: uname, email: mail, password_hash: hash };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  return isValid ? user : null;
}

export function getUserByEmail(email: string): User | null {
  try {
    const result = db.query<[number, string, string, string]>(
      "SELECT id, username, email, password_hash FROM users WHERE email = ?",
      [email],
    );
    
    if (result.length === 0) return null;
    
    const [id, username, mail, password_hash] = result[0];
    return { id, username, email: mail, password_hash };
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Failed to retrieve user");
  }
}

export function closeDb(): void {
  db.close();
}