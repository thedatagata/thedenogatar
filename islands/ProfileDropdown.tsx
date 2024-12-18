import { useState } from "preact/hooks";

export default function ProfileDropdownIsland() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignIn = async () => {
    const email = prompt("Enter your email:");
    if (!email) return;

    const response = await fetch("/api/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setIsSignedIn(true);
      alert("Signed in successfully!");
    } else {
      alert("Failed to sign in.");
    }
  };

  const handleSignOut = async () => {
    const response = await fetch("/api/sign_out", { method: "POST" });
    if (response.ok) {
      setIsSignedIn(false);
      setDropdownOpen(false);
      alert("Signed out successfully!");
    }
  };

  return (
    <div class="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        class="text-[#F8F6F0] hover:text-[#90C137] transition-colors flex items-center gap-2"
      >
        {isSignedIn ? "Profile" : "Account"} ▼
      </button>
      {dropdownOpen && (
        <div class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
          {isSignedIn ? (
            <button
              onClick={handleSignOut}
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Sign Out
            </button>
          ) : (
            <div class="flex flex-col">
              <button
                onClick={handleSignIn}
                class="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
              >
                Sign In
              </button>
              <a
                href="/create-account"
                class="px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Create Account
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


