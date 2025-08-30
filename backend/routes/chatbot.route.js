const express = require('express');
const router = express.Router();
require('dotenv').config();

// --- Base System Prompt for the Medical Chatbot ---
const baseSystemPrompt = `You are "MediBot", an advanced AI medical assistant. Your purpose is to provide clear, accurate, and easy-to-understand medical information.

Your core instructions are:
1.  **Prioritize Safety and Disclaimers**: For every single response, you MUST include a concluding sentence stating: "This information is for educational purposes only. Please consult with a qualified healthcare professional for any medical advice or diagnosis."
2.  **Act as an Educator**: Explain complex medical topics in simple terms.
3.  **Be Empathetic but Cautious**: Never give a diagnosis, prescribe medication, or provide a specific treatment plan.
4.  **Promote Professional Consultation**: If a user describes symptoms that could be serious, your primary goal is to gently but firmly encourage them to seek professional medical help.
5.  **Structure and Clarity**: Use lists, bullet points, and bold text.
6.  **Be Concise and Direct**: Provide short, crisp, and to-the-point answers.
7.  **Maintain a Respectful Tone**: Always be respectful and professional.
8.  **Scope of Knowledge**: Your knowledge covers symptoms, medical conditions, treatments (in general terms), wellness, nutrition, and first aid. If outside this scope, politely decline.`;


router.post('/chat', async (req, res) => {
    const { message, language } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    // Add language instruction to the system prompt
    const finalSystemPrompt = `${baseSystemPrompt}\n\n**IMPORTANT: You MUST respond in ${language}.**`;

    if (!message || !language) {
        return res.status(400).json({ error: 'Message and language are required.' });
    }
    
    if (!apiKey) {
        return res.status(500).json({ error: 'API key is not configured on the server.' });
    }

    try {
        const payload = {
            contents: [{ "parts": [{ "text": message }] }],
            systemInstruction: {
                parts: [{ "text": finalSystemPrompt }]
            },
        };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('Gemini API Error:', errorText);
            throw new Error(`API request failed with status ${apiResponse.status}`);
        }

        const result = await apiResponse.json();
        
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
            const botReply = result.candidates[0].content.parts[0].text;
            res.json({ reply: botReply });
        } else {
             // Handle cases where the response is blocked or empty
            const blockReason = result.candidates?.[0]?.finishReason;
            const responseText = blockReason ? `My response was blocked for the following reason: ${blockReason}. Please try rephrasing your question.` : "I'm sorry, I couldn't generate a response for that. Please try again.";
            res.json({ reply: responseText });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Failed to fetch response from AI model.' });
    }
});

module.exports = router;