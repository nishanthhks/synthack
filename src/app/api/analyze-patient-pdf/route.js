// File: /app/api/analyze-patient-pdf/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the file to base64
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const base64Data = Buffer.from(bytes).toString("base64");
    const mimeType = file.type;

    // Set up the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define the prompt to extract patient information
    const prompt = `
      You are a medical records analyzer. Please extract all relevant patient information from this medical document.
      Analyze the PDF and extract the following information in JSON format:
      
      1. Basic information: fullName, contactNumber, gender, age, bloodGroup
      2. Medical information: allergies, currentMedications, smokingAlcoholStatus, chronicConditions
      3. Current condition: currentProblem, symptoms, bloodPressure, bloodSugarLevel
      4. Treatment information: diagnosis, treatmentPlan, medicationsPrescribed, proceduresPerformed, outcome, doctorNotes
      
      Return ONLY the JSON object with these fields. If you cannot find a value for a field, leave it as an empty string.
      The JSON must be properly formatted and match the exact field names listed above.
    `;

    // Prepare the file part for Gemini in the correct format
    const fileInlinePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data
      }
    };

    // Make the request to Gemini with the correct format
    const result = await model.generateContent({
      contents: [{ 
        parts: [
          { text: prompt },
          fileInlinePart
        ] 
      }]
    });
    
    const response = await result.response;
    const text = response.text();

    // Extract the JSON from the response
    // This assumes Gemini returns a well-formatted JSON
    let patientData = {};

    try {
      // Find JSON in the response (in case there's other text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        patientData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing JSON from Gemini response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse patient data from the document" },
        { status: 500 }
      );
    }

    return NextResponse.json({ patientData });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process the PDF file" },
      { status: 500 }
    );
  }
}
