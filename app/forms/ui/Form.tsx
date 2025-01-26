"use client";

import { useState } from "react";

export function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    name?: string;
    email?: string;
  }>({
    name: "",
    email: "",
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email) {
      if (!name) {
        setErrorMessages((prev) => ({
          ...prev,
          name: "Name is required",
        }));
      }

      if (!email) {
        setErrorMessages((prev) => ({
          ...prev,
          email: "Email is required",
        }));
      }

      return;
    }

    setSuccess(true);
  }

  return (
    <div className="w-full">
      <form
        action=""
        data-testid="form"
        className="space-y-4 mt-20 flex flex-col max-w-md w-full border rounded-md shadow-md mx-auto p-6"
        onSubmit={onSubmit}
      >
        <label htmlFor="name" className="text-sm font-medium text-gray-800">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          data-testid="input-name"
          className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email" className="text-sm font-medium text-gray-800">
          Email
        </label>
        <input
          type="email"
          id="email"
          data-testid="input-email"
          name="email"
          className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          data-testid="button-submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {errorMessages.name && (
        <p data-testid="error-name" className="text-red-600 text-center mt-4">
          {errorMessages.name}
        </p>
      )}

      {errorMessages.email && (
        <p data-testid="error-email" className="text-red-600 text-center mt-4">
          {errorMessages.email}
        </p>
      )}

      {success && (
        <div
          data-testid="success-message"
          className="text-green-600 text-center mt-4"
        >
          Form submitted successfully!
          <p>name: {name}</p>
          <p>email: {email}</p>
        </div>
      )}
    </div>
  );
}
