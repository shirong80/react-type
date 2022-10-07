import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import { useParams } from "react-router";

type RouteParams = {
  coinId: string;
};
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useParams<RouteParams>();
  const { isLoading, data } = useQuery<IHistorical[]>(["chart", coinId], () =>
    fetchCoinHistory(coinId!)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart.."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data !== undefined ? data.map((price) => price.close) : [],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              categories: data?.map((price) =>
                price.time_close.substring(0, 10)
              ),
            },
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
