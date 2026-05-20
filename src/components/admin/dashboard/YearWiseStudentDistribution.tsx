import { School } from "@mui/icons-material";

const YearWiseStudentDistribution = () => {
  const data = [
    {
      key: "1",
      name: "First Year Student",
      value: "5999",
    },
    {
      key: "2",
      name: "Second Year Student",
      value: "5509",
    },
    {
      key: "3",
      name: "Third Year Student",
      value: "3470",
    },
    {
      key: "4",
      name: "Forth Year Student",
      value: "2151",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      {data?.map((item) => (
        <div
          className="w-full rounded-xl shadow-lg select-none  bg-themeSecondary text-white justify-between p-4 flex items-center gap-4"
          key={item?.key}
        >
          <div className="flex items-center gap-4">
            <span className="rounded-md p-2    bg-gray-100 flex items-center justify-center">
              <School className="text-themeSecondary text-4xl " />
            </span>
            <h3 className="font-medium tracking-wide text-base">
              {item?.name}
            </h3>
          </div>
          <h3 className="font-semibold tracking-wide text-2xl text-medium">
            {item?.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default YearWiseStudentDistribution;
