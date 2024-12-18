// routes/api/auth/logout.ts
import { Handler } from "$fresh/server.ts";

export const handler: Handler = {
  async POST(_req: Request) {
    return new Response(null, {
      status: 303,
      headers: {
        "Location": "/",
        "Set-Cookie": "session_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
    });
  },
};