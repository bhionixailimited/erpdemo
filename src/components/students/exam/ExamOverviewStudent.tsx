import { StackedBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type ExamOverviewDataType ={
  data:{
    completedExam:number;
    ongoingExam:number;
    title:string;
    totalExam:number;
    upcomingExam:string;
    _id:string
  }[]
}

export default function ExamOverviewStudent({}: {}) {

  const {data} = useSWRFetch<ExamOverviewDataType>(`dashboard/student/exam-overview`)

  return (
    <StackedBarGraph
      series={[
        {
          name: "COMPLETED",
          data: data?.data?.map((item)=>item?.completedExam) || [],
        },
        {
          name: "ONGOING",
          data: data?.data?.map((item)=>item?.ongoingExam) || []  ,
        },
        {
          name: "UPCOMING",
          data: data?.data?.map((item)=>item?.upcomingExam) || [],
        },
      ]}
      categories={data?.data?.map((item)=>item?.title) || []}
      labels={["Completed", "Ongoing", "Canceled"]}
      colors={["#5B50A1", "#C43C5C", "#E97451"]}
      title="Exams Overview "
    />
  );
}
