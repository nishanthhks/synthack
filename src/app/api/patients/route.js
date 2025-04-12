import { NextResponse } from "next/server";
import { Patient, PatientDetails } from "@/models/medical";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

// GET handler to fetch all patients
export async function GET() {
  try {
    await dbConnect();
    
    // Get the current doctor's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get patients for the current doctor only
    const patients = await Patient.find({ doctorId: session.user.id });
    const patientDetailsPromises = patients.map(async (patient) => {
      const details = await PatientDetails.findOne({ patientId: patient._id });
      return {
        id: patient._id.toString(),
        doctorId: patient.doctorId.toString(),
        contactNumber: patient.contactNumber,
        fullName: patient.fullName,
        details: details ? {
          id: details._id.toString(),
          patientId: details.patientId.toString(),
          gender: details.gender,
          age: details.age,
          bloodGroup: details.bloodGroup,
          allergies: details.allergies,
          currentMedications: details.currentMedications,
          smokingAlcoholStatus: details.smokingAlcoholStatus,
          symptoms: details.symptoms,
          currentProblem: details.currentProblem,
          bloodPressure: details.bloodPressure,
          bloodSugarLevel: details.bloodSugarLevel,
          chronicConditions: details.chronicConditions,
          diagnosis: details.diagnosis,
          treatmentPlan: details.treatmentPlan,
          medicationsPrescribed: details.medicationsPrescribed,
          proceduresPerformed: details.proceduresPerformed,
          outcome: details.outcome,
          doctorNotes: details.doctorNotes,
          createdAt: details.createdAt.toISOString(),
        } : null,
      };
    });

    const patientsWithDetails = await Promise.all(patientDetailsPromises);
    return NextResponse.json({ patients: patientsWithDetails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

// POST handler to create a new patient
export async function POST(req) {
  try {
    await dbConnect();
    
    // Get the current doctor's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const doctorId = session.user.id;
    
    const {
      fullName,
      contactNumber,
      gender,
      age,
      bloodGroup,
      allergies,
      currentMedications,
      smokingAlcoholStatus,
      symptoms,
      currentProblem,
      bloodPressure,
      bloodSugarLevel,
      chronicConditions,
      diagnosis,
      treatmentPlan,
      medicationsPrescribed,
      proceduresPerformed,
      outcome,
      doctorNotes,
    } = await req.json();

    // Check if required fields are provided
    if (!fullName || !contactNumber || !gender || !age || !bloodGroup) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    // Ensure doctorId is a valid ObjectId
    const objectIdDoctorId = new mongoose.Types.ObjectId(doctorId);

    // Check if a patient with this phone number already exists for this doctor
    let existingPatient = await Patient.findOne({ 
      contactNumber, 
      doctorId: objectIdDoctorId 
    });
    
    let patient;

    if (existingPatient) {
      // Update existing patient
      existingPatient.fullName = fullName;
      await existingPatient.save();
      patient = existingPatient;
    } else {
      // Create a new patient
      patient = await Patient.create({
        doctorId: objectIdDoctorId,
        fullName,
        contactNumber,
      });
    }

    // Create or update patient details
    const patientDetailsData = {
      patientId: patient._id,
      gender,
      age,
      bloodGroup,
      allergies,
      currentMedications,
      smokingAlcoholStatus,
      symptoms,
      currentProblem,
      bloodPressure,
      bloodSugarLevel,
      chronicConditions,
      diagnosis,
      treatmentPlan,
      medicationsPrescribed,
      proceduresPerformed,
      outcome,
      doctorNotes,
    };

    let patientDetails;
    const existingDetails = await PatientDetails.findOne({ patientId: patient._id });

    if (existingDetails) {
      // Update existing details
      patientDetails = await PatientDetails.findByIdAndUpdate(
        existingDetails._id,
        patientDetailsData,
        { new: true }
      );
    } else {
      // Create new details
      patientDetails = await PatientDetails.create(patientDetailsData);
    }

    // Format the response
    const formattedPatient = {
      id: patient._id.toString(),
      doctorId: doctorId,
      contactNumber,
      fullName,
      details: {
        id: patientDetails._id.toString(),
        patientId: patient._id.toString(),
        gender,
        age,
        bloodGroup,
        allergies,
        currentMedications,
        smokingAlcoholStatus,
        symptoms,
        currentProblem,
        bloodPressure,
        bloodSugarLevel,
        chronicConditions,
        diagnosis,
        treatmentPlan,
        medicationsPrescribed,
        proceduresPerformed,
        outcome,
        doctorNotes,
        createdAt: patientDetails.createdAt.toISOString(),
      },
    };

    return NextResponse.json({ 
      message: existingPatient ? 'Patient updated successfully' : 'Patient created successfully',
      patient: formattedPatient
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating patient:', error);
    return NextResponse.json({ error: 'Failed to create/update patient' }, { status: 500 });
  }
}

// DELETE handler to delete a patient
export async function DELETE(req) {
  try {
    await dbConnect();
    
    // Get the current doctor's session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
    }

    // Verify the patient belongs to the current doctor
    const patient = await Patient.findOne({ 
      _id: id, 
      doctorId: session.user.id 
    });
    
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found or unauthorized' }, { status: 404 });
    }

    // Delete patient details first
    await PatientDetails.deleteOne({ patientId: id });
    
    // Then delete the patient
    await Patient.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Patient deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json({ error: 'Failed to delete patient' }, { status: 500 });
  }
}
