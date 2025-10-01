import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // https://www.sec.gov/search-filings/edgar-application-programming-interfaces
      "/sec": {
        target: "https://data.sec.gov",
        // Pretend the request originated from the target host.
        changeOrigin: true,
        // Strip the leading "/sec" before forwarding to the target.
        rewrite: (p) => p.replace(/^\/sec/, ""),
        headers: {
          // SEC requires a User-Agent header
          // https://www.sec.gov/about/webmaster-frequently-asked-questions#developers
          "User-Agent": "MP-2 alexiak@bu.edu>"
        },
      },
    },
  },
});
