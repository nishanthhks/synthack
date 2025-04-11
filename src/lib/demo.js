const inputString = "62yo F w/ T2DM (suboptimal control, symptoms present, Metformin adjusted), controlled HTN & Hyperlipidemia on meds.,Reinforce taking Metformin BID with largest meals to improve efficacy/reduce GI side effects.,Formal referral to a Registered Dietitian (RD) for personalized Medical Nutrition Therapy (MNT) focusing on carbohydrate counting/glycemic index.,Implement structured self-monitoring of blood glucose (SMBG) at home (e.g., fasting & post-prandial) and provide education on interpreting results/adjusting diet/activity.,Patient may report improved tolerance if taken with meals; glucose improvement expected over weeks/months.,Patient likely receptive to RD referral; adherence to MNT recommendations will determine impact on glycemic control.,Patient may initially find SMBG demanding but gain better understanding of glucose patterns; improved control depends on action taken based on results.";

/**
 * Parses the specific comma-separated medical summary string.
 * Assumes fields are primarily separated by '.,'
 * @param {string} dataString - The input string.
 * @returns {object|null} - An object with extracted fields or null if parsing fails.
 */
function extractMedicalData(dataString) {
  // Check if the input is a non-empty string
  if (typeof dataString !== 'string' || dataString.length === 0) {
    console.error("Input must be a non-empty string.");
    return null;
  }

  // Split the string using ".," as the delimiter
  // This delimiter seems specific to the structure of your generated string.
  const parts = dataString.split('.,');

  // We expect exactly 7 parts based on your prompt's structure
  if (parts.length === 7) {
    // Trim whitespace and any lingering trailing periods from each part
    const cleanedParts = parts.map(part => part.trim().replace(/\.$/, '').trim());

    // Assign to a structured object
    const extracted = {
      patientCondition: cleanedParts[0],
      treatment1: cleanedParts[1],
      treatment2: cleanedParts[2],
      treatment3: cleanedParts[3],
      response1: cleanedParts[4],
      response2: cleanedParts[5],
      response3: cleanedParts[6]
    };
    return extracted;
  } else {
    console.error(`Parsing failed. Expected 7 parts separated by '.,' but found ${parts.length}.`);
    console.log("Raw parts found:", parts); // Log for debugging
    return null;
  }
}

// --- Usage ---
const extractedInfo = extractMedicalData(inputString);

if (extractedInfo) {
  console.log("Successfully extracted data:");
  console.log("Patient Condition:", extractedInfo.patientCondition);
  console.log("Treatment 1:", extractedInfo.treatment1);
  console.log("Treatment 2:", extractedInfo.treatment2);
  console.log("Treatment 3:", extractedInfo.treatment3);
  console.log("Response 1:", extractedInfo.response1);
  console.log("Response 2:", extractedInfo.response2);
  console.log("Response 3:", extractedInfo.response3);

  console.log("\n--- JSON Output ---");
  console.log(JSON.stringify(extractedInfo, null, 2)); // Pretty print JSON
} else {
  console.log("Could not extract data from the string.");
}