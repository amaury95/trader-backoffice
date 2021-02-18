import { gql, useQuery } from "@apollo/client";
import { AccountQuery } from "types";
import { useContext } from "react";
import { Store } from "store";
import { CurrencyDisplay } from "components/CurrencyDisplay";
// import {
//   LineChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Line,
//   CartesianGrid,
// } from "recharts";

const sessionQuery = gql`
  query Session {
    session {
      balance
      edges {
        income {
          amount
          createdAt
        }
        outcome {
          amount
          createdAt
        }
      }
    }
  }
`;

export default function BoardView() {
  const { state } = useContext(Store);
  const { data, loading } = useQuery<AccountQuery>(sessionQuery);

  if (loading || !data) {
    return <div>loading...</div>;
  }

  const { session } = data;

  if (!session) {
    return <div>error loading session...</div>;
  }

  return (
    <div>
      {session && (
        <>
          <h3>
            Account Balance:{" "}
            <CurrencyDisplay
              amount={session.balance}
              currency={state.currency}
            />
          </h3>
          {/* <LineChart
            width={800}
            height={400}
            data={processData(data)}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <YAxis dataKey="amount" />
            <XAxis dataKey="created_at" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="created_at"
              stroke="#ff7300"
              yAxisId={0}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#387908"
              yAxisId={1}
            />
          </LineChart> */}
        </>
      )}
    </div>
  );
}

// interface DataShape {
//   [key: string]: number[];
// }

// const processData = (data: AccountQuery) => {
//   const elements = data.session?.edges?.income || [];
//   const result: DataShape = {};

//   elements.forEach((e) => {
//     const date = new Date(parseInt(e.created_at, 10)).toDateString();
//     result[date] = result[date] ? [...result[date], e.amount] : [e.amount];
//   });

//   return Object.keys(result).map((k) => ({
//     created_at: k,
//     amount: result[k].reduce((acc, val) => acc + val, 0),
//   }));
// };
