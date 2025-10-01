import { useEffect, useState } from "react";
import type { CoinTicker } from "./interface/Coin";
import { CoinList } from "./components/CoinList";

function App() {
  const [coins, setCoins] = useState<CoinTicker[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const rawData = await fetch("https://api.coinpaprika.com/v1/tickers?quotes=USD");
      const results: CoinTicker[] = await rawData.json();
      const top = results
        .filter((d) => d.quotes?.USD && typeof d.rank === "number")
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 25);
      setCoins(top);
    }

    fetchData()
      .then(() => console.log("Data fetched successfully"))
      .catch((e: Error) => console.log("There was the error: " + e));
  }, [coins.length]);


  return (
    <main className="container">
      <h1>Top Coins</h1>
      <CoinList coins={coins} />
    </main>
  );
}

export default App;
