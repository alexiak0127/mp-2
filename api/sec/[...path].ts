// My initial code worked locally but not on Vercel.
// 
// Local dev uses Vite’s dev proxy.
//   - I fetch '/sec/...' in the browser.
//   - Vite forwards that to 'https://data.sec.gov/...' and adds the required User-Agent header.
//   - Because the browser talks to the same origin ('/sec/...'), there’s no CORS problem.
//
// Vercel doesn't have Vite proxy.
//   - A direct browser fetch to 'https://data.sec.gov/...' fails:
//     - data.sec.gov does NOT allow CORS, so browser blocks the response.
//     - Browsers won’t let me set the 'User-Agent' header. SEC requires it, so the request is rejected.
//
// SO: I needed to add the following using my prior experience at Old North Illuminated.
// 
// A tiny serverless proxy at '/api/sec/*'
//   - The browser calls my own origin: '/api/sec/...'
//   - The function calls 'https://data.sec.gov/...' and injects 'User-Agent'
//   - It returns the JSON back to the browser.
//
// A small fetch base switch in the frontend:
//     const base = import.meta.env.DEV ? "/sec" : "/api/sec";
//     fetch('${base}/submissions/CIK${CIK}.json');
//
// This way, the same app code works in both environments:
//   - In DEV, '/sec' hits Vite’s proxy.
//   - In Vercel, '/api/sec' hits my Vercel function that adds the header and bypasses CORS.
//

export const config = { runtime: "edge" };  // Tell Vercel to run this at the edge (fast, no Node APIs)

export default async function handler(req: Request) { // Default export = the function Vercel executes for this route
  const u = new URL(req.url); // Parse the incoming request URL
  const rest = u.pathname.replace(/^\/api\/sec\//, ""); // Grab everything after /api/sec/ (the path to be forwarded)
  const target = `https://data.sec.gov/${rest}${u.search}`; // Build the upstream SEC URL

  return fetch(target, {
    headers: { "User-Agent": "MP-2 alexiak@bu.edu" },
  });
}
