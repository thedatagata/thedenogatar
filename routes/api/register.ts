// routes/api/register.ts
import { Handlers } from "$fresh/server.ts";
import { createUser } from "../../utils/sqlite.ts";

export const handler: Handlers = {
 async POST(req) {
   try {
     const { username, email, password } = await req.json();

     if (!username?.trim() || !email?.trim() || !password?.trim()) {
       return new Response(
         JSON.stringify({ error: "All fields are required" }), 
         { status: 400 }
       );
     }

     const user = await createUser(username, email, password);

     return new Response(
       JSON.stringify({ success: true, user: {
         id: user.id,
         username: user.username,
         email: user.email
       }}), 
       { status: 201 }
     );

   } catch (error) {
     console.error("Registration error:", error instanceof Error ? error.message : String(error));
     return new Response(
       JSON.stringify({ error: error instanceof Error ? error.message : "Registration failed" }), 
       { status: 500 }
     );
   }
 }
};