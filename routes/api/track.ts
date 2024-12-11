// routes/api/track.ts
import { Handlers } from "$fresh/server.ts";
import { trackEvent } from "../../utils/analytics.server.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json();
      // Add event_id server-side
      const event = {
        ...body,
        event_id: crypto.randomUUID()
      };
      const result = await trackEvent(event);
      return new Response(JSON.stringify({ success: result }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  },
};