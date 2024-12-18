import UserForm from "../../islands/UserForm.tsx";

export default function AccountPage() {
  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Manage Your Account
        </h1>
        <p class="text-gray-600 mb-4 text-center">
          Create a new user account by entering your details below.
        </p>
        <UserForm />
      </div>
    </div>
  );
}
