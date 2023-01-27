import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Look for the query parameter, and return if we don't find it
  if (url.searchParams.get("page") !== "one") {
    return context.rewrite("/posts/one-more-post");
  }
  console.log(`Transforming the response from this ${url}`);

  const response = await context.next();

  const text = await response.text();
  return new Response(text.toUpperCase(), response);
};

export const config = { path: '/' };
