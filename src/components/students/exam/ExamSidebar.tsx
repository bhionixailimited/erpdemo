import { QuestionPalette } from "components/common";
import { useAuth } from "hooks";

const ExamSidebar = () => {
  const { user } = useAuth();
  return (
    <div className="col-span-4 2xl:col-span-3 flex flex-col">
      <div className=" shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-t-8 border-theme  rounded-xl bg-white ">
        <div className="flex gap-2 items-center border-b border-theme p-5">
          <div>
            <img
              className="w-16 h-16 rounded-full bg-white overflow-hidden object-cover"
              src={user?.photoUrl}
              alt="user-profile"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg">{user?.displayName}</p>
            <p className="text-theme text-sm">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <QuestionPalette />
      </div>
    </div>
  );
};

export default ExamSidebar;
