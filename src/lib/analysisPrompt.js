const analysisPrompt = `
You are a highly capable medical assistant AI. Analyze the following single patient record meticulously:



Based strictly on the information contained within this single record:

1.  Summarize: Provide a concise summary of the patient's current medical condition, key findings from this record (like vitals, symptoms, diagnosis), and the immediate outcome or plan mentioned.
2.  Suggest: Identify and detail exactly 3 distinct potential treatment refinements, logical next steps, or monitoring strategies that build upon or optimize the current \`treatmentPlan\`. Base these suggestions directly on the patient's \`diagnosis\`, \`symptoms\`, \`chronicConditions\`, and the existing \`treatmentPlan\`.
3.  Predict: For each of the 3 suggestions you provide, predict a plausible patient response. This could relate to adherence, symptom evolution, potential side effects, understanding, or required behavioral changes.

CRITICAL INSTRUCTION: Output Format

Your entire response MUST be a single, valid JSON object. Do not include any introductory text, concluding remarks, or any characters outside of the JSON structure itself.

The JSON object must adhere exactly to the following structure:
{
  "conditionSummary": "string",
  "suggestedTreatments": [
    {
      "id": 1,
      "suggestion": "string",
      "rationale": "string (briefly explain why this suggestion is relevant based on the data)",
      "predictedResponse": "string"
    },
    {
      "id": 2,
      "suggestion": "string",
      "rationale": "string",
      "predictedResponse": "string"
    },
    {
      "id": 3,
      "suggestion": "string",
      "rationale": "string",
      "predictedResponse": "string"
    }
  ]
}
  return the json object
`;
