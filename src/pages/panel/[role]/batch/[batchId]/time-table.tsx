import { FormControl, MenuItem, Select } from "@mui/material";
import { BatchCalender } from "components/admin";
import { AddTimetableDrawer, BatchLayout } from "components/teachers";
import { useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const BatchTimetable = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [refetch, setRefetch] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const { query, push } = useRouter();

  const { batchId } = query;
  const {
    data: batch,
    mutate,
    isValidating,
  } = useSWRFetch<any>(`batch/${batchId}`);

  const [selectBatchSectionName, setSelectBatchSectionName] = useState<string>(
    batch?.data?.batchSection?.[0] || ""
  );
  useEffect(() => {
    // Check if batch and batchSection data is available
    if (batch?.data?.batchSection && batch.data.batchSection.length > 0) {
      setSelectBatchSectionName(batch?.data?.batchSection?.[0]);
    }
    // if (options && options.length > 0) {
    //   setSelectBatchSectionName(options[0]);
    // }
  }, [batch]);
  return (
    <BatchLayout>
      <section className="w-full flex flex-col bg-white shadow-lg p-4 rounded-md">
        {/* <div className="w-full grid  grid-cols-6 gap-4 px-4 mt-4 ">
          {days?.map((item) => (
            <h3
              className="font-semibold tracking-wide text-theme text-base text-center "
              key={item}
            >
              {item}
            </h3>
          ))}
        </div> */}
        <BatchSection
          selectBatchSectionName={selectBatchSectionName}
          setSelectBatchSectionName={setSelectBatchSectionName}
          batch={batch}
          // options={options}
        />
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  gap-2  xl:gap-4 py-4">
          {days?.map((item, index) => (
            <div className="flex flex-col gap-2 xl:gap-4" key={index}>
              <h3
                className="font-semibold tracking-wide text-theme text-base text-center "
                key={item}
              >
                {item}
              </h3>
              <span
                className={`flex flex-col p-2 2xl:p-4 items-center justify-center h-30 xl:h-36 2xl:h-44 bg-theme rounded-lg shadow-md border  `}
              >
                <AddTimetableDrawer
                  handleRefetch={() => setRefetch((prev) => !prev)}
                  day={index + 1}
                  selectBatchSectionName={selectBatchSectionName}
                />
              </span>
            </div>
          ))}
        </div>
        <BatchCalender
          refetch={refetch}
          day={days}
          selectBatchSectionName={selectBatchSectionName}
        />
      </section>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(BatchTimetable);

export const BatchSection = ({
  selectBatchSectionName,
  setSelectBatchSectionName,
  batch,
}: // options,
{
  selectBatchSectionName: string;
  setSelectBatchSectionName: any;
  batch: any;
  // options: any;
  batchSectionDuplicate?: any;
}) => {
  const handleBatchSelect = (e: any) => {
    setSelectBatchSectionName(e.target.value);
  };
  return (
    <div className="flex justify-end">
      <div className="min-w-[15rem] rounded-lg shadow-lg shadow-slate-400">
        <FormControl sx={{ width: "100%" }}>
          <Select
            className="!w-full !text-theme !font-semibold "
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectBatchSectionName}
            onChange={handleBatchSelect}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {batch?.data?.batchSection?.map((item: any, i: number) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
            {/* {options?.map((item: any, i: number) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
