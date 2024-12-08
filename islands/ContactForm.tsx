
import { useState } from "preact/hooks";
import { trackEvent } from "../utils/analytics.ts";
import { getCookie, setCookie } from "../utils/cookies.ts";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    // Retrieve required cookies
    const anonymous_id = getCookie("anonymous_id");
    const session_id = getCookie("session_id");
    let user_id = getCookie("user_id");

    if (!anonymous_id || !session_id) {
      console.error("Missing anonymous_id or session_id");
      return;
    }

    try {
      // Only generate and store a new user_id if it doesn't exist
      if (!user_id) {
        user_id = crypto.randomUUID();
        setCookie("user_id", user_id, { path: "/", maxAge: 60 * 60 * 24 * 365 }); // 1 year
      }

      // Submit form data to the server-side API
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymous_id, user_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      console.log("Form submission recorded on server");

      // Track the successful form submission event
      const eventPayload = {
        event_type: "form_submission",
        event_id: crypto.randomUUID(),
        session_id,
        anonymous_id,
        user_id,
        timestamp: Date.now(),
      };
      console.log("Tracking event payload:", eventPayload);

      await trackEvent(eventPayload);
      console.log("Form submission event tracked successfully");

      // Clear form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="grid grid-cols-1 gap-y-6">
      <div>
        <label htmlFor="name" class="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gator-green focus:ring-gator-green"
        />
      </div>

      <div>
        <label htmlFor="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gator-green focus:ring-gator-green"
        />
      </div>

      <div>
        <label htmlFor="message" class="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage((e.target as HTMLInputElement).value)}
          required
          rows={4}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gator-green focus:ring-gator-green"
        />
      </div>

      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gator-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gator-green"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
