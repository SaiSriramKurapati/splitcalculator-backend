const { OpenAI } = require('openai');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

exports.extractItemsFromBill = async (filePath) => {
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');

    const prompt = `
                Extract the individual items, their prices, subtotal, tax, and total from this bill image. 
                Return the result strictly in the following JSON format:
                {
                "items": [
                    {
                    "name": "string",
                    "price": "number"
                    }
                ],
                "subtotal": "number",
                "tax": "number",
                "total": "number"
                }

                Ensure:
                - Keys are always 'items', 'name', 'price', 'subtotal', 'tax', and 'total'.
                - Values are strictly numeric where required.
                - JSON is well-formed and valid.
                - Return zero values or empty arrays for missing data.
                `;



    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",  // Use the updated model
            messages: [
                {
                    role: "system",
                    content: "You are an AI assistant that processes bill images and extracts itemized details in structured JSON format."
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
        });

        const extractedText = response.choices[0].message.content;

        try {
             // Remove backticks and optional 'json' language hint
            const cleanResponse = extractedText.replace(/```json|```/g, '').trim();

            const parsedData = JSON.parse(cleanResponse);

            
            return parsedData;
        } catch (parseError) {
            console.error("Failed to parse OpenAI response:", extractedText);
            throw new Error("Response could not be parsed as JSON.");
        }

    } catch (error) {
        console.error("OpenAI API Error: ", error);
        throw new Error("Failed to process the bill through OpenAI.");
    }
};



