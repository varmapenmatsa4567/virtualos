import axios from "axios";

// pages/api/wolfram.js
export async function GET(req) {
   const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return Response.json({ error: 'Query is required' });
  }

  try {
    const response = await axios({
            url: `https://api.wolframalpha.com/v1/result?i=${query}&appid=V7WAUA-7HT9KHRX3K`,
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