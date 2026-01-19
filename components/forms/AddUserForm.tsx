"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddUserForm: React.FC = () => {
  //
  //
  //

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = {
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
    };

    try {
      await axios.post("http://localhost:5000/api/v1/users/new", userData);
      console.log(userData);
      router.push("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cerulean-50 to-olive-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-cerulean-100 overflow-hidden">
          <div className="bg-linear-to-r from-cerulean to-pacific px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Add New User
            </h1>
          </div>

          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    value={first_name}
                    aria-label="first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    maxLength={2}
                    placeholder="TX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cerulean mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-cerulean mb-2">
                  Notes <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mb-6 border border-cerulean-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-transparent"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-cerulean-100">
                <button
                  type="button"
                  className="px-6 py-2 bg-white border border-cerulean-100 text-cerulean rounded-md hover:bg-olive-50 transition-colors"
                  onClick={() => router.push("/admin/list/users")}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-cerulean text-white rounded-md hover:bg-pacific transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
