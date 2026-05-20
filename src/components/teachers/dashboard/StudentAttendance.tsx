import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StudentAttendance() {
  return (
    <div className="rounded-xl bg-white p-6 w-full shadow-xl border ">
      <ApexCharts
        options={{
          title: {
            text: "Student Attendance Per Month (Online Classes) ",
            style: {
              fontWeight: "700",
              fontSize: "16px",
              color: "black",
              fontFamily: "Montserrat",
            },
          },
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            stackType: "normal",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "right",
            offsetX: 0,
            offsetY: 50,
          },

          colors: ["#5B50A1", "#ff4560"],
        }}
        series={[
          {
            name: "Present",
            data: [44, 55, 41, 67, 22, 43, 21, 49, 55, 41, 67, 22],
          },
          {
            name: "Absent",
            data: [13, 23, 20, 8, 13, 27, 33, 12, 23, 20, 8, 13],
          },
        ]}
        type={"bar"}
      />
    </div>
  );
}
