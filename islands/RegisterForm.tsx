
import { useState } from "preact/hooks";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleInput = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      globalThis.location.href = "/login";
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4 max-w-md mx-auto p-6">
      {error && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div>
        <label for="username" class="block text-sm font-medium">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onInput={handleInput}
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onInput={handleInput}
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onInput={handleInput}
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          minLength={8}
          required
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}