import { AppContextProvider } from "contexts/AppContextProvider";
import { useSWRFetch } from "hooks";
import { ClassLayout } from "layouts/class";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ClassType } from "types/class";

const AgoraCall = dynamic(() => import("./AgoraCall"), {
  ssr: false,
});

type ClassDataType = {
  data: ClassType;
};

const CallView = () => {
  const { query } = useRouter();
  const classId = query.callId;
  const { data } = useSWRFetch<ClassDataType>(classId && `class/${classId}`);

  return (
    <AppContextProvider>
      <ClassLayout>
        <div className="w-full   text-white bg-gray-900  ">
          <div className="absolute top-0 z-50 w-full border-r border-white">
            <h3 className="font-medium tracking-wide text-lg p-4 bg-theme ">
              {data?.data?.subject?.title} class for{" "}
              {data?.data?.batch?.course?.title}
            </h3>
          </div>
          <AgoraCall classId={classId?.toString()} />
        </div>
      </ClassLayout>
    </AppContextProvider>
  );
};

export default CallView;
