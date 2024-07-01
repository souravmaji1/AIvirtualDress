import { Client } from "@gradio/client";
import { NextResponse } from 'next/server';

// Maximum time (in milliseconds) to wait for the Gradio client
const GRADIO_TIMEOUT = 50000; // 50 seconds

export async function POST(req) {
  try {
    console.log("API route called");
    const formData = await req.formData();
    console.log("Form data received");

    const backgroundFile = formData.get('background');
    const garmentFile = formData.get('garment');

    if (!backgroundFile || !garmentFile) {
      console.log("Missing files");
      return NextResponse.json({ error: 'Both background and garment files are required.' }, { status: 400 });
    }

    const backgroundBlob = await backgroundFile.arrayBuffer();
    const garmentBlob = await garmentFile.arrayBuffer();

    console.log("Files converted to ArrayBuffer");

    // Connect to Gradio client with a timeout
    const connectWithTimeout = async () => {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), GRADIO_TIMEOUT)
      );
      const connectionPromise = Client.connect("yisol/IDM-VTON");
      return Promise.race([connectionPromise, timeoutPromise]);
    };

    const app = await connectWithTimeout();
    console.log("Connected to Gradio client");

    // Perform prediction with a timeout
    const predictWithTimeout = async () => {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Prediction timeout')), GRADIO_TIMEOUT)
      );
      const predictionPromise = app.predict("/tryon", [
        {"background": new Blob([backgroundBlob]), "layers": [], "composite": null},
        new Blob([garmentBlob]),
        "Hello!!",
        true,
        true,
        20,
        20,
      ]);
      return Promise.race([predictionPromise, timeoutPromise]);
    };

    const result = await predictWithTimeout();
    console.log("Prediction result:", JSON.stringify(result, null, 2));

    if (Array.isArray(result.data) && result.data.length >= 2) {
      const backgroundUrl = result.data[0]?.url;
      const garmentUrl = result.data[1]?.url;

      if (backgroundUrl && garmentUrl) {
        return NextResponse.json({ backgroundUrl, garmentUrl });
      }
    }

    console.log('Unexpected result format:', JSON.stringify(result.data, null, 2));
    return NextResponse.json({ error: 'Received an unexpected result format from the server.', data: result.data }, { status: 500 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: 'An error occurred while processing your request: ' + error.message }, { status: 500 });
  }
}