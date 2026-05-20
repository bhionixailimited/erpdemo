import {
  AttachMoneyOutlined,
  FormatListBulleted,
  Money,
  Quiz,
} from "@mui/icons-material";
import ApplicationDetails from "components/apply/registration/student-profile/ApplicationDetails";
import { useSWRFetch } from "hooks";
import StudentProfileLayout from "layouts/studentProfileLayout";

const ProfilePage = () => {
  const { data } = useSWRFetch<{
    data: {
      totalQueryResolved: number;
      totalQuery: number;
      isRejected: boolean;
      isApplicationSubmitted: boolean;
      isPaymentDone: boolean;
      isMovedToStudent: boolean;
    };
  }>(`registration/dashboard`);

  const STUDENT_ARR = [
    {
      _id: "1",
      title: "Application Status",
      count: data?.data?.isApplicationSubmitted ? "Submitted" : "Not Submitted",
      icon: <FormatListBulleted fontSize="large" />,
    },
    {
      _id: "2",
      title: "Payment Status",
      count: data?.data?.isPaymentDone ? "Paid" : "Not Paid",
      icon: <Money fontSize="large" />,
    },
    {
      _id: "3",
      title: "Query Raised",
      count: data?.data?.totalQuery,
      icon: <Quiz fontSize="large" />,
    },
  ];
  return (
    <StudentProfileLayout title="Student">
      <section className="main-container pt-2">
        <aside className="w-full grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-2">
          {STUDENT_ARR?.map((item: any) => (
            <StudentCard item={item} key={item?._id} />
          ))}
        </aside>
        <aside>
          <div className="w-full md:p-4">
            <ApplicationDetails />
          </div>
        </aside>
      </section>
    </StudentProfileLayout>
  );
};
const StudentCard = ({ item }: { item: any }) => {
  return (
    <article
      className={
        "cursor-pointer hover:bg-slate-100/50 w-full bg-white flex  items-center justify-between p-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-2xl"
      }
    >
      <section className="w-52 flex flex-col gap-2">
        <p className="text-lg md:text-2xl  font-semibold text-primary">
          {item?.count}
        </p>
        <p className="text-base font-medium ">{item?.title}</p>
      </section>
      <section className="w-14 h-14 flex items-center justify-center  rounded-full ">
        <p>{item?.icon}</p>
      </section>
    </article>
  );
};
export default ProfilePage;
