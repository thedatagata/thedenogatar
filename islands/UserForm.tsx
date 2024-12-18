import { useState } from "preact/hooks";

export default function UserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    

    const data = await response.json();

    if (response.ok) {
      setMessage("Account created successfully!");
      setEmail("");
      setPassword("");
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
          class="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          class="w-full border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Create Account
      </button>
      {message && <p class="text-center text-gray-700">{message}</p>}
    </form>
  );
}
