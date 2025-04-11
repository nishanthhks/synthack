import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get patient data from request body
    const patientDetails = await request.json();
    console.log(patientDetails);
    
    // Initialize Gemini API client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct prompt for Gemini based on patient details
    const prompt = constructMedicalPrompt(patientDetails);
    
    // Get treatment analysis from Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    // Parse the response into structured format
    const structuredAnalysis = parseGeminiResponse(analysisText);
    
    // Return the analysis to the client
    return NextResponse.json({ analysis: structuredAnalysis }, { status: 200 });
  } catch (error) {
    console.error('Error analyzing treatment with Gemini:', error);
    return NextResponse.json({ 
      error: 'Failed to generate treatment analysis',
      details: error.message 
    }, { status: 500 });
  }
}

// Helper function to construct a medical prompt for Gemini
function constructMedicalPrompt(patientDetails) {
  return `
    Patient Medical Analysis Request
    
    Please analyze the following patient data and provide 3 possible treatment options along with 3 potential outcomes for each treatment.
    Present your response in a structured format that can be parsed as JSON.
    
    Patient Information:
    - Gender: ${patientDetails.gender}
    - Age: ${patientDetails.age}
    - Blood Group: ${patientDetails.bloodGroup}
    - Allergies: ${patientDetails.allergies || 'None reported'}
    - Current Medications: ${patientDetails.currentMedications || 'None'}
    - Smoking/Alcohol Status: ${patientDetails.smokingAlcoholStatus || 'Unknown'}
    
    Medical Condition:
    - Current Problem: ${patientDetails.currentProblem}
    - Symptoms: ${patientDetails.symptoms}
    - Blood Pressure: ${patientDetails.bloodPressure}
    - Blood Sugar Level: ${patientDetails.bloodSugarLevel}
    - Chronic Conditions: ${patientDetails.chronicConditions || 'None'}
    - Current Diagnosis: ${patientDetails.diagnosis || 'Pending'}
    
    Current Treatment:
    - Treatment Plan: ${patientDetails.treatmentPlan || 'Not established'}
    - Medications Prescribed: ${patientDetails.medicationsPrescribed || 'None'}
    - Procedures Performed: ${patientDetails.proceduresPerformed || 'None'}
    - Current Outcome: ${patientDetails.outcome || 'Unknown'}
    
    Doctor's Notes:
    ${patientDetails.doctorNotes || 'No notes provided'}
    
    Format your response in the following JSON structure:
    {
      "treatments": [
        {
          "name": "Treatment Option 1 Name",
          "description": "Detailed description of treatment option 1",
          "outcomes": [
            "Positive outcome description",
            "Neutral outcome description",
            "Negative outcome description"
          ]
        },
        {
          "name": "Treatment Option 2 Name",
          "description": "Detailed description of treatment option 2",
          "outcomes": [
            "Positive outcome description",
            "Neutral outcome description",
            "Negative outcome description"
          ]
        },
        {
          "name": "Treatment Option 3 Name",
          "description": "Detailed description of treatment option 3",
          "outcomes": [
            "Positive outcome description",
            "Neutral outcome description",
            "Negative outcome description"
          ]
        }
      ]
    }
  `;
}

// Helper function to parse Gemini's response into structured format
function parseGeminiResponse(responseText) {
  try {
    // First try to extract JSON if it's wrapped in markdown code blocks
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : responseText;
    
    // Parse the JSON
    const parsedResponse = JSON.parse(jsonStr);
    
    // Validate the structure
    if (!parsedResponse.treatments || !Array.isArray(parsedResponse.treatments)) {
      throw new Error('Invalid response structure');
    }
    
    return parsedResponse;
  } catch (error) {
    console.error('Failed to parse Gemini response:', error);
    
    // Fallback response if parsing fails
    return {
      treatments: [
        {
          name: "Error in Analysis",
          description: "Unable to process patient data for analysis. Please try again or consult with a specialist.",
          outcomes: [
            "Retry with more detailed patient information",
            "Consider manual review of patient records",
            "Consult with a specialist for proper diagnosis"
          ]
        }
      ]
    };
  }
}