
import { useState } from "preact/hooks";
import { trackClientEvent } from "../utils/analytics.browser.ts";
import { getCookie } from "../utils/cookies.ts";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {  // Added try block here
      // Retrieve required cookies
      const anonymous_id = getCookie("anonymous_id");
      const session_id = getCookie("session_id");

      if (!anonymous_id || !session_id) {
        console.error("Missing anonymous_id or session_id");
        return;
      }

      // Submit form data to the server-side API
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymous_id, session_id, name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      await trackClientEvent({
        event_type: "form_submission",
        name,
        email,
        message,
        session_id,
        anonymous_id,
        timestamp: Date.now(),
      });

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