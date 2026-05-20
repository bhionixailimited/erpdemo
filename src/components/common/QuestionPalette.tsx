import { useExamData, useQuestionData } from "hooks";

const answer_type = [
  {
    id: 1,
    title: "Answered",
    color: "bg-green-500 rounded-t-3xl",
  },
  {
    id: 2,
    title: "Not Answered",
    color: "bg-themeSecondary rounded-b-3xl",
  },
  {
    id: 3,
    title: "Marked",
    color: "bg-theme rounded-full",
  },
  {
    id: 4,
    title: "Not Visited",
    color: "bg-gray-100 rounded-md border",
  },
];
const QuestionPalette = () => {
  const { questionData, handleChangeQuestion } = useQuestionData();
  const { exam } = useExamData();

  return (
    <div className="w-full flex flex-col p-5 gap-4">
      <div>
        <p className="font-semibold">Question Palette: </p>
      </div>
      <div className="w-full flex flex-wrap items-center gap-4 justify-center">
        {questionData?.map((item, index) => (
          <div
            key={item?.question?._id}
            className={`${
              item?.answer?.markAsReview
                ? "bg-theme text-white !rounded-full"
                : item?.answer?.notAnswered === false && item?.answer?.isVisited
                ? "bg-green-500 text-white rounded-t-3xl"
                : item?.answer?.notAnswered && item?.answer?.isVisited
                ? "bg-themeSecondary text-white border rounded-b-3xl "
                : "bg-gray-100 rounded-md"
            } border w-12 h-12 2xl:w-16 2xl:h-16 font-semibold text-lg flex items-center text-center justify-center cursor-pointer `}
            onClick={() =>
              exam?.allowStudentToMoveFreely &&
              handleChangeQuestion?.(index + 1)
            }
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-2 gap-4 place-items-center p-4">
        {answer_type.map((item) => (
          <div
            key={item.id}
            className="flex gap-1 items-center justify-start w-full col-span-1"
          >
            <div className={`h-10 w-10 ${item.color}`}></div>
            <p className="text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPalette;
