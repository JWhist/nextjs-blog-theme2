import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Look for the query parameter, and return if we don't find it
  switch (true) {
    case (url.searchParams.get("page") === "one"):
      return context.rewrite("/posts/one-more-post");
    case (url.searchParams.get("page") === "two"):
      return context.rewrite("/posts/example-post");
    case (url.searchParams.get("page") === "three"):
      return context.rewrite("/posts/test-post");
    case (url.searchParams.get("upper") === "true"):
      console.log(`Transforming the response from this ${url}`);

      const response = await context.next();

      const text = await response.text();
      return new Response(text.toUpperCase(), response);
  }
  return
};

export const config = { path: '/' };
