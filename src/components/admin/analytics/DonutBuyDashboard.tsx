import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutBuyDashboard({ type }: any) {
  const options = {
    series: [850, 747, 650, 598],
    options: {
      chart: {
        type: type,
      },
      labels: ["Received Amount", "Distribution Amount"],
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      // ],
      colors: ["#b00b13", "#005d32"],
    },
  };

  return (
    <>
      <div className="p-3">
        <h2 className="text-black font-semibold pl-5">Active Buy Status</h2>
        <ApexCharts
          height={"340"}
          options={{
            chart: {
              type: "donut",
              height: 850,
              width: "100%",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "50%",
                },
              },
            },

            //   dataLabels: {
            //     formatter: function (w) {
            //       return 249
            //     },
            //   },
            //   {
            //     total: {
            //       show: true,
            //       label: 'Total',
            //       formatter: function (w) {
            //         return 249
            //       },
            //     },
            //   },
            // ],

            labels: ["Initiated", "Received", "Completed", "Cancelled"],

            colors: ["#db2777", "#C04000", "#E97451", "#F2D2BD"],
          }}
          series={options.series}
          type={type}
        />
      </div>
    </>
  );
}
