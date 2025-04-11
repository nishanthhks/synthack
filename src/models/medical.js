import mongoose from "mongoose";

const { Schema } = mongoose;

// Doctor Schema
const DoctorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

// Patient Schema
const PatientSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  contactNumber: { type: String, required: true },
  fullName: { type: String, required: true },
});

// Patient Details Schema
const PatientDetailsSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },

  // Patient condition
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  allergies: { type: String },
  currentMedications: { type: String },
  smokingAlcoholStatus: { type: String },
  symptoms: { type: String },
  currentProblem: { type: String },
  bloodPressure: { type: String },
  bloodSugarLevel: { type: String },
  chronicConditions: { type: String },

  // Treatment-related info
  diagnosis: { type: String },
  treatmentPlan: { type: String },
  medicationsPrescribed: { type: String },
  proceduresPerformed: { type: String },
  outcome: { type: String },
  doctorNotes: { type: String },

  createdAt: { type: Date, default: Date.now },
});

// Create models if they don't exist
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
const PatientDetails =
  mongoose.models.PatientDetails ||
  mongoose.model("PatientDetails", PatientDetailsSchema);

export { Doctor, Patient, PatientDetails };
