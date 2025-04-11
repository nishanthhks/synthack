import { GoogleGenerativeAI } from "@google/generative-ai";
import { analysisPrompt } from "@/lib/analysisPrompt";
export async function GET() {
  try {
    // --- 1. Extract JSON data from request ---
    // const data = await request.json();
    const data = {
      id: "66180f1babcdef1234567891", // Auto-generated ObjectId
      patientId: "66180e0c123456abcdef7891", // ObjectId of the related Patient
      gender: "Male",
      age: 25,
      bloodGroup: "O-",
      allergies: null, // No known allergies
      currentMedications: "None",
      smokingAlcoholStatus: "Smoker (0.5 pack/day)",
      symptoms:
        "Sore throat, cough (productive, yellow sputum), fever (101 F), body aches",
      currentProblem: "Upper Respiratory Tract Infection symptoms for 4 days",
      bloodPressure: "118/76 mmHg",
      bloodSugarLevel: null, // Not relevant/tested for this visit
      chronicConditions: "None known",
      diagnosis: "Acute Bronchitis, likely viral",
      treatmentPlan:
        "Symptomatic care: Rest, increased fluid intake, throat lozenges, OTC Acetaminophen/Ibuprofen for fever/pain. Advised smoking cessation.",
      medicationsPrescribed:
        "Recommend OTC Acetaminophen 500mg q4-6h PRN fever/pain",
      proceduresPerformed:
        "Physical examination (lungs clear auscultation), Temperature check",
      outcome: "Stable, Conservative Management",
      doctorNotes:
        "Patient presents with symptoms consistent with acute bronchitis, likely viral etiology. No signs of bacterial pneumonia. Advised supportive care and return if symptoms worsen significantly (e.g., shortness of breath, high persistent fever). Provided brief smoking cessation counseling.",
      createdAt: "2025-04-11T14:20:30.000Z", // Auto-generated timestamp
    };

    if (!data) {
      return new Response("No data provided", { status: 400 });
    }

    // --- 2. Set up Gemini ---
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- 3. Prepare the prompt with patient data ---
    const patientData = JSON.stringify(data);
    const fullPrompt = `${analysisPrompt}Patient Data: ${patientData}`;

    // --- 4. Generate content with Gemini ---
    const result = await model.generateContent([{ text: fullPrompt }]);

    const rawText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("Gemini did not return expected content", result);
      return new Response("AI did not return usable content", { status: 500 });
    }

    return Response.json({ success: true, data: rawText });
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
