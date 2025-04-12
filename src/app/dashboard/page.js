"use client";
import React, { useState, useEffect } from "react";
import {
  UserRound,
  FilePlus,
  Trash2,
  LineChart,
  Activity,
  Users,
  Calendar,
  ChevronRight,
  PieChart,
  AlertCircle,
  Stethoscope,
  Search,
  Database,
  BarChart,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import NewPatientForm from "@/components/NewPatientForm";
import { signOut } from "next-auth/react";

// Dashboard metrics
const metrics = {
  totalPatients: 324,
  activePatients: 189,
  newPatientsLastMonth: 27,
  averageAge: 46,
  mostCommonDiagnosis: "Hypertension",
  averageTreatmentTime: "9.5 days",
};

export default function PatientDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [treatmentAnalysis, setTreatmentAnalysis] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [patientsData, setPatientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/patients");
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      // Ensure patientsData is always an array
      console.log(data);
      if (data && data.patients && Array.isArray(data.patients)) {
        setPatientsData(data.patients);
      } else {
        setPatientsData([]);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError(err.message);
      // Initialize with empty array on error
      setPatientsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowAnalysis(false);
    setAnalysisError(null);
  };

  const handleDeletePatient = async (id) => {
    try {
      const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      // Refresh the patient list after deletion
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert(`Error deleting patient: ${error.message}`);
    }
  };

  const handleAnalyzeTreatment = async () => {
    if (!selectedPatient) return;

    // Check if we already have analysis for this patient
    if (treatmentAnalysis[selectedPatient.id]) {
      setShowAnalysis(true);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch("/api/analyze-treatment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedPatient.details),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze treatment");
      }

      const data = await response.json();

      // Store the analysis result
      setTreatmentAnalysis((prev) => ({
        ...prev,
        [selectedPatient.id]: data.analysis,
      }));

      setShowAnalysis(true);
    } catch (error) {
      console.error("Error analyzing treatment:", error);
      setAnalysisError(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="text-blue-400" />
          <h1 className="text-xl font-semibold">Patient Repository</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-8 pr-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
            <FilePlus size={16} />
            <span onClick={() => setShowNewPatientForm(true)}>New Patient</span>
            {showNewPatientForm && (
              <NewPatientForm
                isOpen={showNewPatientForm}
                onClose={() => setShowNewPatientForm(false)}
                onSuccess={() => {
                  setShowNewPatientForm(false);
                  fetchPatients(); // Refresh patient list after adding
                }}
              />
            )}
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md flex items-center space-x-2"
            onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Patient Statistics</h2>
              <Users className="text-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.totalPatients}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Patients</p>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.activePatients}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">New (30 days)</p>
                <p className="text-2xl font-bold text-green-600">
                  +{metrics.newPatientsLastMonth}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg. Age</p>
                <p className="text-2xl font-bold text-gray-800">
                  {metrics.averageAge}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Diagnostic Summary</h2>
              <Stethoscope className="text-blue-500" />
            </div>
            <div className="flex items-center justify-center h-32">
              <PieChart className="text-blue-600 w-28 h-28 opacity-70" />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Most Common Diagnosis</p>
              <p className="font-medium text-gray-800">
                {metrics.mostCommonDiagnosis}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Treatment Metrics</h2>
              <Activity className="text-blue-500" />
            </div>
            <div className="flex items-center justify-center h-32">
              <BarChart className="text-blue-600 w-28 h-28 opacity-70" />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Avg. Treatment Duration</p>
              <p className="font-medium text-gray-800">
                {metrics.averageTreatmentTime}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Patient List */}
          <div className="lg:w-1/2 xl:w-2/5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-medium text-gray-700">
                  Patient Repository
                </h2>
                <div className="text-sm text-gray-500">
                  {patientsData.length} patients
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  <div className="p-8 flex justify-center items-center">
                    <Loader2 className="animate-spin text-blue-500 mr-2" />
                    <span className="text-gray-600">Loading patients...</span>
                  </div>
                ) : error ? (
                  <div className="p-8 text-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600">{error}</p>
                    <Button
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={fetchPatients}>
                      Retry
                    </Button>
                  </div>
                ) : patientsData.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No patients found. Add a new patient to get started.
                  </div>
                ) : (
                  patientsData.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedPatient?.id === patient.id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : ""
                      }`}
                      onClick={() => handlePatientClick(patient)}>
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-full p-2">
                          <UserRound className="text-gray-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {patient.fullName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {patient.contactNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePatient(patient.id);
                          }}>
                          <Trash2 size={16} />
                        </button>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:w-1/2 xl:w-3/5">
            {selectedPatient ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h2 className="font-medium text-gray-700">
                      Patient Details
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      ID: {selectedPatient.id}
                    </span>
                  </div>
                  {!showAnalysis && (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center space-x-1"
                      onClick={handleAnalyzeTreatment}
                      disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 size={14} className="animate-spin mr-1" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <LineChart size={14} />
                          <span>Analyze Treatment</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {showAnalysis ? (
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-lg text-gray-800">
                        Treatment Analysis for {selectedPatient.fullName}
                      </h3>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowAnalysis(false)}>
                        <ChevronDown size={20} />
                      </button>
                    </div>

                    <Alert className="mb-4 bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">
                        AI Analysis
                      </AlertTitle>
                      <AlertDescription className="text-blue-700">
                        The following treatment suggestions were generated by
                        Gemini AI based on the patient's condition and medical
                        history.
                      </AlertDescription>
                    </Alert>

                    {analysisError ? (
                      <Alert className="mb-4 bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">
                          Analysis Failed
                        </AlertTitle>
                        <AlertDescription className="text-red-700">
                          {analysisError}. Please try again or contact support.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-6">
                        {treatmentAnalysis[selectedPatient.id]?.treatments.map(
                          (treatment, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-gray-800 mb-2">
                                {treatment.name}
                              </h4>
                              <p className="text-gray-600 mb-4">
                                {treatment.description}
                              </p>

                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                Possible Outcomes:
                              </h5>
                              <ul className="space-y-2">
                                {treatment.outcomes.map((outcome, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm flex items-start space-x-2">
                                    <div
                                      className={`mt-1 h-2 w-2 rounded-full ${
                                        idx === 0
                                          ? "bg-green-500"
                                          : idx === 1
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                      }`}></div>
                                    <span className="text-gray-600">
                                      {outcome}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-3">
                          Personal Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">
                              {selectedPatient.fullName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Contact Number
                            </p>
                            <p className="font-medium">
                              {selectedPatient.contactNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="font-medium">
                              {selectedPatient.details.gender}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="font-medium">
                              {selectedPatient.details.age}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Blood Group</p>
                            <p className="font-medium">
                              {selectedPatient.details.bloodGroup}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-700 mb-3">
                          Medical Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Allergies</p>
                            <p className="font-medium">
                              {selectedPatient.details.allergies || "None"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Current Medications
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.currentMedications ||
                                "None"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Smoking/Alcohol Status
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.smokingAlcoholStatus ||
                                "Unknown"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Chronic Conditions
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.chronicConditions ||
                                "None"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h3 className="font-medium text-gray-700 mb-3">
                          Current Condition
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Current Problem
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.currentProblem || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Symptoms</p>
                            <p className="font-medium">
                              {selectedPatient.details.symptoms ||
                                "None reported"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Blood Pressure
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.bloodPressure ||
                                "Not measured"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Blood Sugar Level
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.bloodSugarLevel ||
                                "Not measured"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h3 className="font-medium text-gray-700 mb-3">
                          Treatment Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Diagnosis</p>
                            <p className="font-medium">
                              {selectedPatient.details.diagnosis || "Pending"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Treatment Plan
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.treatmentPlan ||
                                "Not established"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Medications Prescribed
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.medicationsPrescribed ||
                                "None"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Procedures Performed
                            </p>
                            <p className="font-medium">
                              {selectedPatient.details.proceduresPerformed ||
                                "None"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Outcome</p>
                            <p
                              className={`font-medium ${
                                selectedPatient.details.outcome === "Improving"
                                  ? "text-green-600"
                                  : selectedPatient.details.outcome === "Stable"
                                  ? "text-blue-600"
                                  : selectedPatient.details.outcome ===
                                    "Worsening"
                                  ? "text-red-600"
                                  : ""
                              }`}>
                              {selectedPatient.details.outcome || "Unknown"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Last Updated
                            </p>
                            <p className="font-medium">
                              {new Date(
                                selectedPatient.details.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Doctor's Notes
                        </h3>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          <p className="text-gray-700">
                            {selectedPatient.details.doctorNotes ||
                              "No notes available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center text-center h-full">
                <UserRound size={48} className="text-gray-300 mb-4" />
                <h3 className="text-gray-600 font-medium mb-2">
                  No Patient Selected
                </h3>
                <p className="text-gray-500 max-w-md">
                  Select a patient from the list to view their detailed
                  information and treatment analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
