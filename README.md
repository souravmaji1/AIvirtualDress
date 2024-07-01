"use client"

import { useState } from 'react';

export default function VirtualTryOn() {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [garmentUrl, setGarmentUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runApi = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ backgroundUrl, garmentUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Check if data.result is a string (URL)
      if (typeof data.result === 'string') {
        setResult(data.result);
      } else {
        console.log('Unexpected result format:', data.result);
        setError('Received an unexpected result format from the server.');
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={backgroundUrl}
        onChange={(e) => setBackgroundUrl(e.target.value)}
        placeholder="Background Image URL"
      />
      <input
        type="text"
        value={garmentUrl}
        onChange={(e) => setGarmentUrl(e.target.value)}
        placeholder="Garment Image URL"
      />
      <button onClick={runApi}>Run Virtual Try-On</button>
      {error && <p>Error: {error}</p>}
      {result && <img src={result} alt="Virtual Try-On Result" />}
    </div>
  );
}




import { Client } from "@gradio/client";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { backgroundUrl, garmentUrl } = await req.json();

    // Fetch the background image
    const backgroundResponse = await fetch(backgroundUrl);
    const backgroundBlob = await backgroundResponse.blob();

    // Fetch the garment image
    const garmentResponse = await fetch(garmentUrl);
    const garmentBlob = await garmentResponse.blob();

    const app = await Client.connect("yisol/IDM-VTON");
    const result = await app.predict("/tryon", [
      {"background": backgroundBlob, "layers": [], "composite": null},
      garmentBlob,
      "Hello!!",
      true,
      true,
      20,
      20,
    ]);

    return NextResponse.json({ result: result.data });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}