import { Avatar } from "@mui/material";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import ManageProgramType from "types/manageprograms";
import AddProgramDialog from "./AddProgramDialog";
import AllProgramsCard from "./AllProgramsCard";

type dataType = {
  data: ManageProgramType[];
};

const ManageProgram = () => {
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    "programme?pageNo=1&perPage=10"
  );

  const [refetch, setRefetch] = useState(false);
  return (
    <div className="w-full">
      <div className="px-4 mt-4">
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="w-full col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-theme rounded-xl ">
            <span
              className={`flex flex-col p-2 2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-44`}
            >
              <Avatar
                src="https://cdn-icons-png.flaticon.com/128/4413/4413569.png"
                variant="rounded"
                sx={{
                  height: 54,
                  width: 54,
                }}
              />
              <AddProgramDialog mutate={mutate} />
            </span>
          </div>
          {data?.data?.map((item) => (
            <AllProgramsCard
              _id={item?._id}
              key={item?._id}
              allData={item}
              title={item?.title}
              variant={item?.variant}
              programmeFee={item?.programmeFee}
              mutate={mutate}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProgram;
