
import { Handlers } from "$fresh/server.ts";
import { createUser, getUserByEmail } from "../../utils/db/sqlite.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();
      const { email, password } = body;

      // Validate input
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: "Email and password are required" }),
          { status: 400 }
        );
      }

      // Check if the user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "User already exists" }),
          { status: 409 } // Conflict
        );
      }

      // Hash the password
      const passwordHash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(password)
      );
      const passwordHashHex = Array.from(new Uint8Array(passwordHash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Create a new user
      const user = await createUser(email, passwordHashHex);
      return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
    }
  },
};
