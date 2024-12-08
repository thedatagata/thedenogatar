// routes/api/submit.ts
import { Handlers } from "$fresh/server.ts";
import { recordFormSubmission } from "../../utils/db.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const { anonymous_id, user_id } = await req.json();

      if (!anonymous_id || !user_id) {
        return new Response("Missing required fields", { status: 400 });
      }

      // Record form submission in Deno KV
      await recordFormSubmission(anonymous_id, user_id);
      console.log("Form submission recorded successfully");

      return new Response("Form submission successful", { status: 200 });
    } catch (error) {
      console.error("Error recording form submission:", error);
      return new Response("Internal server error", { status: 500 });
    }
  },
};
