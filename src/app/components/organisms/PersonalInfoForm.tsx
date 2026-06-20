"use client"; // Required because this component uses state and handles user events

import { useResumeStore } from "@/app/store/useResumeStore";
import { FormField } from "../molecules/FormField";

export function PersonalInfoForm() {
  // Grab the data and the update function from our Zustand store
  const personalInfo = useResumeStore((state) => state.data.personalInfo);
  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo,
  );

  // A helper function to handle typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-2 text-white">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Full Name"
          name="name"
          id="name"
          placeholder="Jane Doe"
          value={personalInfo.name}
          onChange={handleChange}
        />
        <FormField
          label="Professional Title"
          name="title"
          id="title"
          placeholder="Software Engineer"
          value={personalInfo.title}
          onChange={handleChange}
        />
        <FormField
          label="Email Address"
          name="email"
          id="email"
          type="email"
          placeholder="jane@example.com"
          value={personalInfo.email}
          onChange={handleChange}
        />
        <FormField
          label="Phone Number"
          name="phone"
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={personalInfo.phone}
          onChange={handleChange}
        />
        <FormField
          label="Address / Location"
          name="address"
          id="address"
          placeholder="City, State, Country"
          value={personalInfo.address}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}