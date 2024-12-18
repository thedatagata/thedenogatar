// routes/api/auth/login.ts
import { Handler } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { getUserByEmail } from "../../../utils/db/sqlite.ts";
import { getOrCreateUser } from "../../../utils/db/kv.ts";

export const handler: Handler = {
  async POST(req: Request) {
    try {
      const form = await req.formData();
      const email = form.get("email")?.toString();
      const password = form.get("password")?.toString();

      if (!email || !password) {
        return new Response(JSON.stringify({ error: "Missing credentials" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      const user = await getUserByEmail(email);
      if (!user) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { 
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { 
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Create new session
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
      console.error("Login error:", error);
      return new Response(JSON.stringify({ error: "Login failed" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
};