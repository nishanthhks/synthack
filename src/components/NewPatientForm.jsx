"use client";
import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewPatientForm({ isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    // Patient basic info
    fullName: "",
    contactNumber: "",
    gender: "",
    age: "",
    bloodGroup: "",

    // Medical info
    allergies: "",
    currentMedications: "",
    smokingAlcoholStatus: "",
    symptoms: "",
    currentProblem: "",
    bloodPressure: "",
    bloodSugarLevel: "",
    chronicConditions: "",

    // Treatment info (optional for new patients)
    diagnosis: "",
    treatmentPlan: "",
    medicationsPrescribed: "",
    proceduresPerformed: "",
    outcome: "",
    doctorNotes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Currently hardcoded doctorId - in a real app would come from auth
          doctorId: "d1",
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add patient");
      }

      const data = await response.json();
      onSuccess(data.patient);
      onClose();
    } catch (err) {
      console.error("Error adding patient:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Patient
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        {error && (
          <Alert className="m-4 bg-red-50 border-red-200 text-red-800">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 pb-2 border-b border-gray-200">
                Personal Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age*
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group*
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 pb-2 border-b border-gray-200">
                Medical Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Penicillin, Dust"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Medications
                </label>
                <input
                  type="text"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="e.g., Lisinopril 10mg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Smoking/Alcohol Status
                </label>
                <input
                  type="text"
                  name="smokingAlcoholStatus"
                  value={formData.smokingAlcoholStatus}
                  onChange={handleChange}
                  placeholder="e.g., Non-smoker, social drinker"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chronic Conditions
                </label>
                <input
                  type="text"
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleChange}
                  placeholder="e.g., Hypertension, Diabetes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>

            {/* Current Condition Section */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-medium text-gray-700 pb-2 border-b border-gray-200">
                Current Condition
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Problem
                  </label>
                  <input
                    type="text"
                    name="currentProblem"
                    value={formData.currentProblem}
                    onChange={handleChange}
                    placeholder="e.g., Suspected pneumonia"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms
                  </label>
                  <input
                    type="text"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="e.g., Persistent cough, chest pain"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    placeholder="e.g., 120/80"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Sugar Level
                  </label>
                  <input
                    type="text"
                    name="bloodSugarLevel"
                    value={formData.bloodSugarLevel}
                    onChange={handleChange}
                    placeholder="e.g., 110 mg/dL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>
            </div>

            {/* Treatment Information (Optional for new patients) */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-medium text-gray-700 pb-2 border-b border-gray-200">
                Treatment Information (Optional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="e.g., Bacterial pneumonia"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Treatment Plan
                  </label>
                  <input
                    type="text"
                    name="treatmentPlan"
                    value={formData.treatmentPlan}
                    onChange={handleChange}
                    placeholder="e.g., Antibiotics, rest"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medications Prescribed
                  </label>
                  <input
                    type="text"
                    name="medicationsPrescribed"
                    value={formData.medicationsPrescribed}
                    onChange={handleChange}
                    placeholder="e.g., Azithromycin 500mg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Procedures Performed
                  </label>
                  <input
                    type="text"
                    name="proceduresPerformed"
                    value={formData.proceduresPerformed}
                    onChange={handleChange}
                    placeholder="e.g., Chest X-ray, Blood work"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outcome
                  </label>
                  <select
                    name="outcome"
                    value={formData.outcome}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    <option value="">Select outcome</option>
                    <option value="Improving">Improving</option>
                    <option value="Stable">Stable</option>
                    <option value="Worsening">Worsening</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor's Notes
                </label>
                <textarea
                  name="doctorNotes"
                  value={formData.doctorNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add your notes about the patient here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"></textarea>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 flex items-center space-x-2">
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Patient</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
