import type { APIRoute } from "astro";
import { isProduction } from "../consts";

export const GET: APIRoute = ({ site }) => {
  const body = isProduction(site)
    ? `User-agent: *
Allow: /
`
    : `# Preview-Deployment — nicht indexieren
User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
