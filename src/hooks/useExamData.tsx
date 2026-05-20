import { BASE_URL } from "configs";
import dayjs from "dayjs";
import ExamType from "types/exam";
import { ExamSubjectType } from "types/examSubject";
import { getLocalStorageItem } from "utils";
import { create } from "zustand";
type ExamState = {
  examPageNumber: number;
  maxViolation: number;
  isLoading: boolean;
  exam?: Partial<ExamType>;
  subjectExam: Partial<ExamSubjectType>;
  examEndTime?: string;
  examStartTime?: string;
  examDuration: number;
  setExamDuration: (newTime: number) => void;
  getExam: (examId?: string) => Promise<void>;
  getSubjectExam: (subjectExamId?: string) => Promise<void>;
  handleExamSubmit: () => Promise<boolean>;
  handleViolation: () => Promise<void>;
  handleNextExamPage: () => void;
};
const useExamData = create<ExamState>((set, get) => ({
  examPageNumber: 1,
  maxViolation: 10,
  isLoading: true,
  exam: {},
  examDuration: 0,
  subjectExam: {},
  studentAnswerOverview: [],
  getExam: async (examId?: string) => {
    if (!examId) return;
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(`${BASE_URL}exam/${examId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ exam: {}, isLoading: false });
      }
      if (res?.status === 200) {
        const data = await res.json();
        set({ exam: { ...data?.data?.data }, isLoading: false });
      }
    } catch (error) {
      set({ exam: {} });
    }
  },
  getSubjectExam: async (subjectExamId?: string) => {
    if (!subjectExamId) return;
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(
        `${BASE_URL}exam/subject/details/${subjectExamId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ subjectExam: {} });
      }
      if (res?.status === 200) {
        const data = await res.json();
        set({
          subjectExam: { ...data?.data?.data },
          examStartTime: data?.data?.data?.startTime,
          examEndTime: data?.data?.data?.endTime,
          examDuration: dayjs(data?.data?.data?.endTime).diff(
            data?.data?.data?.startTime,
            "millisecond"
          ),
        });
      }
    } catch (error) {
      set({ subjectExam: {} });
    }
  },
  handleExamSubmit: async () => {
    const examId = get().subjectExam?._id;

    if (!examId) return false;

    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(`${BASE_URL}exam/answer/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          subjectExam: examId,
        }),
      });
      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        return false;
      }
      if (res?.status === 200) {
        set({ examPageNumber: 4 });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  handleViolation: async () => {
    const violation = get().maxViolation;

    if (violation <= 1) {
      await get().handleExamSubmit();
    } else {
      set({
        maxViolation: violation - 1,
      });
    }
  },
  setExamDuration: (newTime: number) => {
    set({ examDuration: newTime });
  },
  handleNextExamPage: () => {
    set({ examPageNumber: get().examPageNumber + 1 });
  },
}));

export default useExamData;
