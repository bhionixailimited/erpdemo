import { Tooltip } from "@mui/material";

const QuestionOverView = ({ QuestionCount }: any) => {
  return (
    <div className=" shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-t-8 gap-5 flex flex-col border-theme  rounded-xl bg-white">
      <div className="px-5 pt-5">
        <p className="text-lg text-theme font-semibold">Question Overview :</p>
      </div>
      <div className="grid grid-cols-5 place-items-center gap-4 border border-b-theme px-5 pb-5">
        {Array(QuestionCount?.length)
          .fill(0)
          .map((item, index) => (
            <div
              key={index}
              className={`${
                index === 3 || index === 5 || index === 8 || index === 9
                  ? "bg-themeSecondary"
                  : "bg-theme"
              } grid grid-cols-1 h-14 w-14  rounded-2xl justify-center text-white font-bold items-center text-center`}
            >
              {index + 1}
            </div>
          ))}
      </div>
      <div className="px-5 pb-5 flex w-full gap-2 justify-between">
        <div className="flex gap-1 items-center">
          <p className="text-base font-semibold">Answered: </p>
          <Tooltip title="Answered">
            <p className="cursor-pointer bg-theme h-10 w-10 rounded-full flex items-center justify-center text-center text-white tracking-tight">
              5
            </p>
          </Tooltip>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-base font-semibold">Not Answered: </p>
          <Tooltip title="Not Answered">
            <p className="cursor-pointer bg-themeSecondary h-10 w-10 rounded-full flex items-center justify-center text-center text-white tracking-tight">
              2
            </p>
          </Tooltip>
        </div>
      </div>
      <div className="px-5 pb-5">
        <button className="btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default QuestionOverView;
