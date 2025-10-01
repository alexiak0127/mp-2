import styled from "styled-components";

export default function FilingsList({
  items,
}: {
  items: Array<{
  // Opened the dev proxy URL in the browser to inspect the actual JSON payload:
  // ex) http://localhost:5173/sec/submissions/CIK0000320193.json
  // The Submissions endpoint returns a "recent" block as compact columnar arrays.
  //   - accessionNumber[i] -> accessionNumber
  //   - filingDate[i]      -> filingDate
  //   - form[i]            -> form
  //   - reportDate[i]      -> reportDate    
    accessionNumber: string;
    filingDate: string;
    form: string;
    reportDate?: string;
  }>;
}) {

  return (
    <Wrap>
      <Head>A streamlined view of Apple’s latest EDGAR submissions. See the filing type, the date it was filed,
      and the official accession number at a glance.</Head>
      <Grid>
        {items.map((f) => (
          <Card key={f.accessionNumber}>
            <Top>
              <TopColLeft>
                <SmallLabel>Form</SmallLabel>
                <FormBadge>{f.form}</FormBadge>
              </TopColLeft>

              <TopColRight>
                <SmallLabel>Filing date</SmallLabel>
                <Time dateTime={f.filingDate}>{f.filingDate}</Time>
              </TopColRight>
            </Top>
            

            <Block>
              <SmallLabel>Accession</SmallLabel>
              <Accession title={f.accessionNumber}>{f.accessionNumber}</Accession>
            </Block>

            {f.reportDate && (
              <Row>
                <Label>Report date</Label>
                <Val>{f.reportDate}</Val>
              </Row>
            )}
          </Card>
        ))}
      </Grid>
    </Wrap>
  );
}

/* -------- styled-components -------- */

const Wrap = styled.section`
  background: transparent;
`;

const Head = styled.h2`
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #f2f8fb;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 30px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Card = styled.article`
  background: #142a3b;            
  border: 1px solid #2a4457;        
  border-radius: 14px;
  padding: 16px;
  box-shadow:
    0 1px 0 #ffffff0a inset,         
    0 10px 30px #00000033;
  transition: border-color 140ms ease, transform 140ms ease, box-shadow 140ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: #2dd4bf99;
    box-shadow:
      0 1px 0 #ffffff0f inset,
      0 14px 36px #2dd4bf1f;
  }
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 12px;
  margin-bottom: 10px;
`;

const TopColLeft = styled.div`
  text-align: left;
`;

const TopColRight = styled.div`
  text-align: right;
`;

const SmallLabel = styled.div`
  font-size: 11px;
  letter-spacing: 0.2px;
  color: #ffffff;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const FormBadge = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.25px;
  color: #ffffff;
  background: linear-gradient(180deg, #22c55e38, #22c55e24);
  border: 1px solid #22c55e73;
  text-align: left;
`;

const Time = styled.time`
  font-size: 12px;
  color: #ffffff;
  text-align: right;
  display: inline-block;
`;

const Block = styled.div`
  margin: 10px 0 12px;
  text-align: left;
`;

const Accession = styled.code`
  display: block;
  margin-top: 6px;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.35;
  word-break: break-all;
  background: #2dd4bf0f;
  border: 1px dashed #2dd4bf61;
  color: #ffffff;
  font-family: Helvetica, arial, verdana, sans-serif;
`;

const Row = styled.p`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  text-align: left;
`;

const Label = styled.span`
  font-size: 12px;
  color: #ffffff;
`;

const Val = styled.span`
  font-size: 14px;
  color: #ffffff;
`;