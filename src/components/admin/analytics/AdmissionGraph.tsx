import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdmissionGraph({
  type,
  text = "",
  series,
  options,
}: {
  type: "bar" | "area" | "line";
  text?: string;
  series?: Array<any>;
  options?: any;
}) {
  return (
    <ApexCharts
      height={"500"}
      width="100%"
      options={options as any}
      series={series || []}
      type={type}
    />
  );
}
