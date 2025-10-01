import { useEffect, useState } from "react";
import "./index.css";
import FilingsList from "./components/FilingsList";

// Apple identifier
const CIK = "0000320193";

export default function App() {
  const [items, setItems] = useState<
    Array<{
      accessionNumber: string;
      filingDate: string;
      form: string;
      reportDate?: string;
    }>
  >([]);

  useEffect(() => {
    // guard so x set state after unmount
    let mounted = true;

    async function fetchData() {
      const res = await fetch(`/sec/submissions/CIK${CIK}.json`);
      const json: any = await res.json();
      const recent = json?.filings?.recent ?? {};

      const rows =
        // Map the columnar data into row objects (fallback to empty array if missing)
        (recent.accessionNumber ?? []).map((acc: string, i: number) => ({
          accessionNumber: acc,
          filingDate: recent.filingDate?.[i] ?? "",
          form: recent.form?.[i] ?? "",
          reportDate: recent.reportDate?.[i],
        })) ?? []; // safety net

      if (mounted) setItems(rows.slice(0, 24));
  }

  fetchData();
  return () => { mounted = false; };
}, []);

  return (
    <main className="container">
      <h1>Apple Inc. — Recent SEC Filings</h1>
      <FilingsList items={items} />
    </main>
  );
}