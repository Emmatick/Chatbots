import { ReactResponse } from "react";
//import Groq from "groq-sdk";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return ReactResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });

    const responseMessage =
      chatCompletion.choices[0]?.message?.content || "No response.";
    return ReactResponse.json({ response: responseMessage });
  } catch (error) {
    console.error("Error in chat API:", error);

    return ReactResponse.json({
      error: "An error occurred while processing your request,",
    });
  }
}
