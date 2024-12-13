// components/Registration.tsx
import RegisterForm from "../islands/RegisterForm.tsx";

export default function Registration() {
  return (
    <section class="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-3xl font-bold mb-8">Create Account</h2>
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" class="text-blue-600 hover:text-blue-500">Sign in</a>
        </p>
      </div>
    </section>
  );
}