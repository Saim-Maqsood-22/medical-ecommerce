import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
    }

    const systemPrompt = `**Rules:**
- Do not express sympathy, concern, or politeness.
- Refuse to respond to non-medical statements.
- Do not explain that you are an AI.
- Do not recommend seeing a doctor unless adding the provided short disclaimer at the end.
- Only ask up to 2 short follow-up questions if needed.
- After receiving answers, suggest medicines from the product list if relevant.
- Responses must be short and only in clean HTML using <p>, <ul>, <li>, <strong>, and <br> tags.
- Do not include extra phrases like "I understand", "It sounds like", "As an AI", etc.

Product List:
- Cough Syrup
- Cotton Roll
- Gauze Pads
- Digital Thermometer
- Band-Aids
- Antiseptic Cream
- Hand Sanitizer

User's message: ${prompt}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        // Optional: lower safety thresholds if medical keywords trigger false positives
        safetySettings: [
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" }
        ]
      }),
    });

    const data = await response.json();

    // Log full response to terminal for debugging
    if (!response.ok || !data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('Gemini API Error Payload:', JSON.stringify(data, null, 2));
      return NextResponse.json({ 
        error: data.error?.message || 'Content blocked or no response from Gemini.' 
      }, { status: 500 });
    }

    return NextResponse.json({ result: data.candidates[0].content.parts[0].text });

  } catch (error) {
    console.error('Route Execution Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}