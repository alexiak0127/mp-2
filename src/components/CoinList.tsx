import styled from "styled-components";
import type { CoinTicker } from "../interface/Coin";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

const Card = styled.article`
  background-color: #111826;
  border: 1px solid #1c2535;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px #00000040;
  transition: transform 120ms ease;
  &:hover { transform: translateY(-2px); }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 0 8px 0;
`;

const Name = styled.h2`
  font-size: 16px;
  margin: 0;
`;

const Symbol = styled.span`
  opacity: 0.8;
  font-size: 13px;
  letter-spacing: 0.5px;
`;

const Rank = styled.span`
  font-size: 12px;
  border: 1px solid #263247;
  background-color: #0f172a;
  padding: 2px 8px;
  border-radius: 999px;
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6px 0 0 0;
  font-size: 14px;
`;

const Label = styled.span` opacity: 0.8; `;

const Value = styled.span<{ tone?: "up" | "down" | "neutral" }>`
  ${(p) => p.tone === "up" && "color: #34d399;"}
  ${(p) => p.tone === "down" && "color: #f87171;"}
`;

export function CoinList({ coins }: { coins: CoinTicker[] }) {
  return (
    <Grid>
      {coins.map((c) => {
        const usd = c.quotes.USD;
        const pct = usd.percent_change_24h;
        const tone = pct > 0 ? "up" : pct < 0 ? "down" : "neutral";
        return (
          <Card key={c.id}>
            <Header>
              <div>
                <Name>{c.name} <Symbol>({c.symbol})</Symbol></Name>
              </div>
              <Rank>Rank #{c.rank}</Rank>
            </Header>
            {/* https://www.geeksforgeeks.org/typescript/typescript-tolocalestring-function/ */}
            <Stat><Label>Price (USD)</Label><Value>${usd.price.toLocaleString()}</Value></Stat>
            <Stat><Label>24h Change</Label><Value tone={tone}>{pct.toFixed(2)}%</Value></Stat>
            <Stat><Label>Market Cap</Label><Value>${usd.market_cap.toLocaleString()}</Value></Stat>
          </Card>
        );
      })}
    </Grid>
  );
}
