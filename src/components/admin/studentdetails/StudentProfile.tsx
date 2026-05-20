import { Grid } from "@mui/material";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";
import UserType from "types/user";
type dataType = {
  data: UserType;
};
const StudentProfile = ({
  statData,
}: {
  statData?: {
    totalAbsent: number;
    totalClass: number;
    totalLeave: number;
    totalPresent: number;
  };
}) => {
  const { user, getUserAllDetails } = useAuth();
  const { studentID } = useRouter()?.query;
  const { data } = useSWRFetch<dataType>(
    studentID && `user/details/${studentID}`
  );

  const attendanceStat = useMemo(() => {
    return [
      {
        id: 1,
        title: "Total classes",
        count: statData?.totalClass,
      },
      {
        id: 2,
        title: "Attend",
        count: statData?.totalPresent,
      },
      {
        id: 3,
        title: "Absent",
        count: statData?.totalAbsent,
      },
      {
        id: 4,
        title: "Total Leave",
        count: statData?.totalLeave,
      },
    ];
  }, [statData]);

  return (
    <div className="flex md:w-11/12 md:p-6 rounded-lg w-full">
      <div className="w-full flex items-center justify-center">
        {/* <div className="flex flex-col w-fit p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-theme rounded-xl  items-center justify-between">
          <div className="">
            <img
              className="w-28 h-28 rounded-full bg-white overflow-hidden object-cover"
              src={data?.data?.photoUrl}
              alt={data?.data?.displayName}
            />
          </div>
          <p className="text-white font-semibold text-lg">
            {data?.data?.displayName ?? "Unavailable"}
          </p>
          <p className="text-white text-sm">
            {data?.data?.email ?? "Unavailable"}
          </p>
        </div> */}
        <div className="md:w-2/3 w-full h-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded flex items-center justify-center  md:p-8 p-2">
          <Grid container spacing={2}>
            {attendanceStat?.map((item) => (
              <Grid item key={item.id} xs={6} sm={6} lg={3}>
                <div className="flex flex-col items-center justify-center gap-1">
                  <p>{item.title}</p>
                  <p className="text-3xl font-bold text-theme">{item.count}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
