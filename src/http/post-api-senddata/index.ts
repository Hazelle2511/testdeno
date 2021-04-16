// TODO: modify the body object!

  import {
    APIGatewayProxyEvent,
    Context,
  } from "https://deno.land/x/lambda/mod.ts"
  const headers = {
    cors: true,
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "content-type": "application/json; charset=utf8",
    "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  };


export async function handler(req: APIGatewayProxyEvent, context: Context) {
  let body: any = req!.body || "no body"
  return {  
    statusCode: 200,
    headers,
    body: JSON.stringify(req)
  }
}



