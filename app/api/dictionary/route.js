import axios from "axios";

// pages/api/dictionary.js
export async function GET(req) {
   const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return Response.json({ error: 'Query is required' });
  }

  try {
    const response = await axios({
            url: `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
      });
    const result = response.data;
    return Response.json(result);
  } catch (error) {
    console.error('WolframAlpha API error:', error);
    return Response.json({ error: 'Failed to process query' });
  }
}