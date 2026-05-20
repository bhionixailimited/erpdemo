import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type WeeklyClassData = {
  data: {
    _id: string;
    totalClass: number;
    courseWise: {
      course: string;
      classCount: number;
    }[];
  }[];
};

const TeacherWeeklyData = () => {
  const { data } = useSWRFetch<WeeklyClassData>(
    `dashboard/teacher/weekly-classes`
  );

  return (
    <div className=" w-full rounded-xl border  items-center bg-white shadow-xl p-4 flex flex-col gap-5 ">
      <h3 className="font-semibold w-full text-left tracking-wide text-black  text-lg">
        Weekly Classes
      </h3>
      <ReactApexChart
        type="pie"
        height={600}
        width={400}
        series={data?.data?.map((item) => item?.totalClass) || []}
        options={{
          chart: {
            width: 380,
            type: "pie",
          },
          legend: {
            position: "bottom",
          },
          labels: data?.data?.map((item) => item?._id) || [],
          responsive: [
            {
              breakpoint: 1500,
              options: {
                chart: {
                  width: 350,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
      />
    </div>
  );
};

export default TeacherWeeklyData;
