import { Loader } from "components/core";
import useAppContext from "contexts/AppContextProvider";
import dayjs from "dayjs";
import { useAuth, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { notify } from "utils";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { query, push } = useRouter();
  const { socketRef } = useAppContext();
  const { user } = useAuth();

  const { mutate } = useFetch();

  const classId = query.callId;

  useEffect(() => {
    (async () => {
      try {
        //check if joining a valid class

        if (!user || !classId) return;

        //check validity of the class
        const response = await mutate({
          path: `class/${classId}`,
          method: "GET",
        });

        if (response?.data?.error) throw new Error(response?.data?.error);

        let data = response?.data?.data?.data;

        if (data?.cancelled) throw new Error("Class is cancelled.");
        if (data?.isHoliday) throw new Error("Class suspended due to holiday.");
        if (dayjs(data?.startTime).isAfter(dayjs()))
          throw new Error(
            "Class is not yet started.Join after the start time."
          );
        if (dayjs(data?.endTime).isBefore(dayjs()))
          throw new Error(
            "Class ended. Can not join a class after it was ended."
          );
        if (data?.type?.toLowerCase() !== "online")
          throw new Error("Class is not online. Join a class that is online.");

        socketRef?.emit("join-to-class", {
          userId: user?._id,
          roomId: classId,
          user: {
            displayName: user?.displayName,
            photoUrl: user?.photoUrl,
            _id: user?._id,
          },
        });

        setIsLoading(false);

        if (user?.role !== "STUDENT") return;

        //update student attendance
        const attendance = await mutate({
          path: `attendance/student/create`,
          method: "POST",
          body: JSON.stringify({
            user: user?._id,
            isPresent: true,
            isAbsent: false,
            isLeave: false,
            classId: classId,
            timeOfEnter: new Date().toISOString(),
          }),
        });

        if (attendance?.data?.error) throw new Error(attendance?.data?.error);
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Something went wrong!");
        }
        setIsLoading(false);
        push(`/panel/${user?.role?.toLowerCase()}/lms`);
      }
    })();
  }, [user, classId]);

  //handle before unload event
  const handleBeforeUnload = async (e: any) => {
    e.preventDefault();
    socketRef?.emit("user-leaving-class", {
      userId: user?._id,
      roomId: classId,
      user: {
        displayName: user?.displayName,
        photoUrl: user?.photoUrl,
        _id: user?._id,
      },
    });

    if (user?.role !== "STUDENT") return;

    //update student attendance
    const attendance = await mutate({
      path: `attendance/student/create`,
      method: "POST",
      body: JSON.stringify({
        user: user?._id,
        classId: classId,
        timeOfExit: new Date().toISOString(),
      }),
    });

    if (attendance?.data?.error) throw new Error(attendance?.data?.error);

    return false;
  };

  useEffect(() => {
    window.onbeforeunload = handleBeforeUnload;
  }, [user]);

  return (
    <section className="w-full h-full ">
      {isLoading ? <Loader visible={true} /> : children}
    </section>
  );
};

export default ClassLayout;
