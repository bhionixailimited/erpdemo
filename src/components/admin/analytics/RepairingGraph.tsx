import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RepairingGraph({ type }: { type: "donut" }) {
  const options = {
    series: [85, 47],
    options: {
      chart: {
        type: type,
        // height: 'auto',
      },
      labels: ["Received Amount", "Distribution Amount"],
      responsive: [
        {
          //   breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      colors: ["#b00b13", "#d9117b"],
    },
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-black">Repairing</h2>

        <ApexCharts
          // height={'auto'}

          options={{
            chart: {
              type: type,
              height: 350,
              // height: '100%',
              // width: '100%',
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

            labels: ["Pending.", "Repaired."],
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
            //       // legend: {
            //       //   position: 'right',
            //       //   offsetY: 40,
            //       // },
            //     },
            //   },
            // ],
            colors: ["#b00b13", "#d9117b"],
          }}
          series={options.series}
          type={type}
        />
      </div>
    </>
  );
}
