// TODO: modify the body object!

  /*const headers = {
    cors: true,
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "content-type": "application/json; charset=utf8",
    "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  };


export async function handler (req: object) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ok: true})
  }
}*/

import "https://deno.land/x/dotenv/load.ts";
import {
  APIGatewayProxyEvent,
  Context,
} from "https://deno.land/x/lambda/mod.ts";

const headers = {
  cors: true,
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "content-type": "application/json; charset=utf8",
  "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
}
export async function handler(req: APIGatewayProxyEvent, context: Context) {
  try {
      // const json:any = { DenoVersion: Deno.version, TypeScriptVersion: Deno.version.typescript }
      return { headers, body: JSON.stringify(Deno.version) }
  } catch (e) {
    console.log(e)
    return {
      headers,
      body: JSON.stringify(e)
    }
  }
}

// Example responses

/* Forward requester to a new path
export async function handler (req: object) {
  return {
    statusCode: 302,
    headers: {
      'location': '/about',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
*/

/* Respond with successful resource creation
export async function handler (req: object) {
  return {
    statusCode: 201,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({ok: true})
  }
}
*/

/* Deliver client-side JS
export async function handler (req: object) {
  return {
    headers: {
      'content-type': 'text/javascript; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: 'console.log("Hello world!")',
  }
}
*/
