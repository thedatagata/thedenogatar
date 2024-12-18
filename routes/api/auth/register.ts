// routes/api/auth/register.ts
import { Handler } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { createUser } from "../../../utils/db/sqlite.ts";
import { getOrCreateUser } from "../../../utils/db/kv.ts";

export const handler: Handler = {
  async POST(req: Request) {
    try {
      const form = await req.formData();
      const email = form.get("email")?.toString();
      const password = form.get("password")?.toString();

      if (!email || !password) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      const passwordHash = await bcrypt.hash(password);
      const user = await createUser(email, passwordHash);

      // Create session
      const session_id = crypto.randomUUID();
      await getOrCreateUser(session_id, user.id);

      return new Response(null, {
        status: 303,
        headers: {
          "Location": "/",
          "Set-Cookie": `session_id=${session_id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.message.includes("UNIQUE constraint failed")) {
        return new Response(JSON.stringify({ error: "Email already exists" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(JSON.stringify({ error: "Registration failed" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
};