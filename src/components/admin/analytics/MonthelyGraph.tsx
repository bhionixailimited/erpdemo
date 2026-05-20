import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  type: "line" | "bar" | "area";
  text?: string;
  productsArray?: any[];
  customersArray?: any[];
  ordersArray?: any[];
  categories: any[];
};

export default function MonthelyGraph({
  type,
  text = "",
  productsArray = [],
  customersArray = [],
  ordersArray = [],
  categories = [],
}: Props) {
  return (
    <div className="rounded-md bg-white p-6 shadow-lg">
      <ApexCharts
        options={{
          title: {
            text: text,
          },
          chart: {
            height: 350,
            type: type,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "category",
            categories: categories,
          },
          tooltip: {
            x: {
              format: "month",
            },
          },
          colors: ["#FF53AE"],
        }}
        series={[
          {
            name: "Products",
            data: productsArray,
          },
        ]}
        type={type}
      />
    </div>
  );
}
