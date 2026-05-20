import {
  useAuth,
  useExamData,
  useFetch,
  useQuestionData,
  useSafeExam,
} from "hooks";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LayoutHeader from "./LayoutHeader";

type Props = {
  children: JSX.Element;
  title?: string;
};
const ExamLayout = ({ children, title = "PoddarErp | Exam" }: Props) => {
  const [isSubmitted, setIdSubmitted] = useState(true);

  const { getExam, getSubjectExam, isLoading, examPageNumber, exam } =
    useExamData();
  const { getQuestionData } = useQuestionData();

  const { query, push } = useRouter();
  const { user, getUserAllDetails } = useAuth();

  useEffect(() => {
    (() => {
      getExam(query?.examId?.toString());
      getSubjectExam(query?.subjectExamId?.toString());
      getUserAllDetails(user?._id);
    })();
  }, [query?.examId, query?.subjectExamId, user?._id]);

  useEffect(() => {
    (() => {
      if (
        !query?.subjectExamId?.toString() ||
        exam?.randomizeQuestionOrder === undefined
      )
        return;
      getQuestionData(
        query?.subjectExamId?.toString(),
        exam?.randomizeQuestionOrder
      );
    })();
  }, [query?.subjectExamId, exam?.randomizeQuestionOrder]);

  const { mutate } = useFetch();

  const handleAlreadySubmitted = async (subjectExam: string) => {
    try {
      const response = await mutate({
        path: `exam/${subjectExam}/check-submit`,
        method: "GET",
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      if (response?.data?.data?.data?.isSubmitted) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      if (!query?.subjectExamId) return;

      const data = await handleAlreadySubmitted(
        query?.subjectExamId?.toString()
      );
      if (!data) {
        setIdSubmitted(false);
        return;
      }
      setIdSubmitted(true);
      toast.error("Exam can not be revisited once submitted");
      push(`/panel/student/exam?reload=true`);
    })();

    return () => {};
  }, [query?.subjectExamId]);

  useSafeExam(isSubmitted);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href={`${
            process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL || `/newfavicon.png`
          }`}
          type="image/png"
        />
      </Head>
      <>
        <main className={`min-h-screen bg-gray-50  dashboard-main `}>
          {examPageNumber === 3 && <LayoutHeader />}
          <div className=" w-full  ">
            {isLoading || isSubmitted ? (
              <div className="h-full w-full">
                <div
                  className={`absolute z-[9999] flex h-full w-full items-center justify-center bg-white`}
                >
                  <div className="relative h-52 w-52">
                    <div className="rotate-animation h-52 w-52 rounded-full border-x-2 border-t-2 border-x-theme border-t-themeLight" />
                    <span className="font-medium flex flex-col items-center gap-1 tracking-wide absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                      <p className="text-xs text-theme "> Exam Starting... </p>{" "}
                      <p className="text-xs text-theme whitespace-nowrap ">
                        Do not close or refresh
                      </p>
                      <p className="text-xs text-theme whitespace-nowrap ">
                        the page.
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </>
    </>
  );
};

export default ExamLayout;
