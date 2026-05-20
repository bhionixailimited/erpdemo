import { BASE_URL } from "configs";
import { QuestionType } from "types/question";
import SubjectType from "types/subject";
import { getLocalStorageItem } from "utils";
import { create } from "zustand";

interface IQuestionAnswerType {
  endTime?: string;
  fullMark?: number;
  passMark?: number;
  question?: QuestionType;
  startTime?: string;
  subject?: SubjectType;
  type?: string;
  _id?: string;
  answer: {
    _id?: any;
    notAnswered?: boolean;
    studentAnswer?: string;
    markAsReview?: boolean;
    isVisited?: boolean;
  };
}

type ExamState = {
  questionPageNo: number;
  totalQuestion: number;
  isLoading: boolean;
  questionData: Partial<IQuestionAnswerType[]>;
  getQuestionData: (arg?: string, randomQuestion?: boolean) => Promise<void>;
  handleSubmitAnswer: (arg: string, answer?: any) => Promise<void>;
  currentQuestionData: Partial<IQuestionAnswerType>;
  handleChangeQuestion?: (arg: number) => void;
  setNextPage: () => void;
  setPrevPage: () => void;
  setMarkAsReview: (questionId: string, answer?: string) => void;
  setRemoveMarkAsReview: (questionId: string, answer?: string) => void;
  handleClearResponse: (questionId: string) => void;
};
const useQuestionData = create<ExamState>((set, get) => ({
  questionPageNo: 1,
  totalQuestion: 0,
  isLoading: true,
  questionData: [],
  currentQuestionData: {},
  getQuestionData: async (examId?: string, randomQuestion?: boolean) => {
    if (!examId) return;
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(
        `${BASE_URL}exam/${examId}/question${
          randomQuestion ? "?random=true" : ""
        }`,
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
        set({ questionData: [], isLoading: false });
      }
      if (res?.status === 200) {
        const data = await res.json();
        set({
          questionData: data?.data?.data?.map((item: any) => {
            return {
              ...item,
              answer: {
                ...item?.answer,
                isVisited: item?.answer?.studentAnswer
                  ? true
                  : item?.answer?.markAsReview
                  ? true
                  : false,
                markAsReview: item?.answer?.markAsReview || false,
                notAnswered: item?.answer?.studentAnswer ? false : true,
              },
            };
          }),
          isLoading: false,
          totalQuestion: data?.data?.data?.length || 0,
        });
        set({
          currentQuestionData: get().questionData[0],
        });
        set({
          questionPageNo: 1,
        });
      }
    } catch (error) {
      set({ questionData: [] });
    }
  },
  handleSubmitAnswer: async (questionId: string, answer?: any) => {
    if (!questionId) return;
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    try {
      const res = await fetch(`${BASE_URL}exam/answer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question: questionId,
          answer: answer,
          markAsReview: get().questionData.find(
            (item) => item?.question?._id === questionId
          )?.answer?.markAsReview,
        }),
      });

      set({
        questionData: get().questionData?.map((item) => {
          if (item?.question?._id === questionId) {
            return {
              ...item,
              answer: {
                ...item?.answer,
                notAnswered: answer?.length ? false : true,
                studentAnswer: answer,
                markAsReview: item?.answer?.markAsReview,
                isVisited: true,
              },
            };
          }
          return item;
        }),
        isLoading: false,
      });

      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ questionData: [], isLoading: false });
      }
    } catch (error) {
      set({ questionData: [] });
    }
  },
  handleChangeQuestion: (questionNumber: number) => {
    set({
      currentQuestionData: get().questionData[questionNumber - 1],
      questionPageNo: questionNumber,
    });
  },
  setNextPage: () => {
    set({
      questionPageNo:
        get().questionPageNo >= get().questionData?.length
          ? get().questionData?.length
          : get().questionPageNo + 1,
    });
    set({
      questionData: get().questionData?.map((item) => {
        if (item?.question?._id === get().currentQuestionData?.question?._id) {
          return {
            ...item,
            answer: {
              ...item?.answer,
              isVisited: true,
            },
          };
        }
        return item;
      }),
    });

    get().handleChangeQuestion?.(get().questionPageNo);
  },
  setPrevPage: () => {
    set({
      questionPageNo: get().questionPageNo <= 1 ? 1 : get().questionPageNo - 1,
    });
    set({
      questionData: get().questionData?.map((item) => {
        if (item?.question?._id === get().currentQuestionData?.question?._id) {
          return {
            ...item,
            answer: {
              ...item?.answer,
              isVisited: true,
            },
          };
        }
        return item;
      }),
    });
    get().handleChangeQuestion?.(get().questionPageNo);
  },
  setMarkAsReview: (questionId: string, answer?: string) => {
    set({
      questionData: get().questionData?.map((item) => {
        if (item?.question?._id === questionId) {
          return {
            ...item,
            answer: {
              ...item?.answer,
              markAsReview: true,
              isVisited: true,
            },
          };
        }
        return item;
      }),
      currentQuestionData: {
        ...get().currentQuestionData,
        answer: {
          ...get().currentQuestionData?.answer,
          markAsReview: true,
          isVisited: true,
        },
      },
    });
    get().handleSubmitAnswer(questionId, answer);
  },
  setRemoveMarkAsReview: (questionId: string, answer?: string) => {
    set({
      questionData: get().questionData?.map((item) => {
        if (item?.question?._id === questionId) {
          return {
            ...item,
            answer: {
              ...item?.answer,
              markAsReview: false,
              isVisited: true,
            },
          };
        }
        return item;
      }),
      currentQuestionData: {
        ...get().currentQuestionData,
        answer: {
          ...get().currentQuestionData?.answer,
          markAsReview: false,
          isVisited: true,
        },
      },
    });
    get().handleSubmitAnswer(questionId, answer);
  },
  handleClearResponse: (questionId: string) => {
    set({
      questionData: get().questionData?.map((item) => {
        if (item?.question?._id === questionId) {
          return {
            ...item,
            answer: {
              ...item?.answer,
              isVisited: true,
              studentAnswer: "",
              markAsReview: item?.answer?.markAsReview,
              notAnswered: true,
            },
          };
        }
        return item;
      }),
    });

    get().handleSubmitAnswer(questionId, "");
  },
}));

export default useQuestionData;
