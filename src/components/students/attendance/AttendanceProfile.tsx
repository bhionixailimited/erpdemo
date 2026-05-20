import { Grid } from "@mui/material";
import { useAuth } from "hooks";
import { useMemo } from "react";

const AttendanceProfile = ({
  statData,
}: {
  statData?: {
    totalAbsent: number;
    totalClass: number;
    totalLeave: number;
    totalPresent: number;
  };
}) => {
  const { user } = useAuth();

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
    <div className="flex w-11/12 p-6 rounded-lg">
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-center">
        <div className="flex flex-col w-fit p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-theme rounded-xl  items-center justify-between">
          <div className="">
            <img
              className="w-28 h-28 rounded-full bg-white overflow-hidden object-cover"
              src={user?.userParent?.photoUrl || user?.photoUrl || "/logo.png"}
              alt={user?.userParent?.displayName || user?.displayName}
            />
          </div>
          <p className="text-white font-semibold text-lg">
            {user?.userParent?.displayName ||
              user?.displayName ||
              "Unavailable"}
          </p>
          <p className="text-white text-sm">
            {user?.userParent?.email || user?.email || "Unavailable"}
          </p>
        </div>
        <div className=" w-full md:w-2/3 h-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-r-xl flex items-center justify-center px-2">
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

export default AttendanceProfile;
