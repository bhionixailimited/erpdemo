import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const MixedGraph = ({
  title = "",
  series,
  options,
}: {
  title?: string;
  series?: Array<any>;
  options?: any;
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="font-medium tracking-wide text-lg pb-4">{title}</h3>
      <ApexCharts
        height={"500"}
        width="100%"
        options={options as any}
        series={series || []}
        type={"area"}
      />
    </div>
  );
};

export default MixedGraph;
