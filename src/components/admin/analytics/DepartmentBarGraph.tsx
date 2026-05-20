import { StackedBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

export default function DepartmentBarGraph({}: {}) {
  const { data, isValidating, error, mutate } = useSWRFetch<any>(
    "dashboard/admin/department-stat"
  );

  return (
    <StackedBarGraph
      series={[
        {
          name: "Total Employees",
          data:
            data?.data[0]?.department?.map(
              (department: any) => department?.employees
            ) || [],
        },
        // {
        //   name: "Female",
        //   data: [53, 32, 33, 52, 13, 43, 32],
        // },
        // {
        //   name: "OTHERS",
        //   data: [22, 27, 21, 19, 25, 31, 20],
        // },
      ]}
      categories={
        data?.data[0]?.department?.map(
          (department: any) => department?.title
        ) || []
      }
      labels={["Completed", "Ongoing", "Canceled"]}
      colors={["#5B50A1", "#C43C5C"]}
      title="Department Wise Staffs Overview "
    />
  );
}
