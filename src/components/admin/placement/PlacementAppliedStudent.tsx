import { FileDownload } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { StudentPlacementCard } from "components/cards";
import { Button, Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { PlacementApplicationType } from "types/appliedstudent";
import { StudentSkeleton } from "../skeleton";
import StudentPlacementDetails from "./StudentPlacementDetails";
type dataType = {
  data: PlacementApplicationType[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};
const PlacementAppliedStudent = () => {
  const [pageNo, setPageNo] = useState(1);
  const { query } = useRouter();

  const { placementId } = query;
  //perPage=10&
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    placementId && `placement/notice/${placementId}/student?pageNo=${pageNo}`
  );

  const [openResume, setOpenResume] = useState<any>(false);
  const headers = [
    { label: "Student Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Batch", key: "batch" },
    { label: "Resume Link", key: "resumeFile" },
    { label: "Applied At", key: "createdTime" },
  ];
  return (
    <div className=" container w-full mx-auto ">
      <StudentPlacementDetails
        open={Boolean(openResume)}
        closeFn={() => setOpenResume(false)}
      />
      <div className="flex flex-col md:flex-row items-center gap-2 pr-4 justify-between border-b bg-white shadow-xl rounded-lg pb-2 md:pb-0">
        <h3 className="font-semibold tracking-wide  text-2xl md:p-4 text-theme ">
          Applied Student
        </h3>
        <CSVLink
          filename="applied-student.csv"
          headers={headers}
          data={
            (data?.data?.length &&
              data?.data?.map((item) => {
                return {
                  ...item,
                  name: item?.user?.displayName,
                  email: item?.user?.email,
                  phoneNumber: item?.user?.phoneNumber,
                  batch: item?.user?.["academic-details"]
                    ? `${item?.user?.["academic-details"]?.batch?.course?.title} ${item?.user?.["academic-details"]?.batch?.branch?.title} ${item?.user?.["academic-details"]?.batch?.session?.title}`
                    : "Not Provided",
                  createdTime: new Date(item?.createdAt),
                };
              })) ||
            []
          }
        >
          <Button
            startIcon={<FileDownload />}
            className=""
            disabled={!data?.data?.length}
          >
            Download Excel
          </Button>
        </CSVLink>
      </div>

      {!data || isValidating ? (
        <div className="w-full grid grid-cols-12 py-4 gap-4">
          <StudentSkeleton i={8} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 lg:grid-cols-3 xl:grid-cols-4">
          {data?.data?.length ? (
            data?.data?.map((item, index) => (
              <StudentPlacementCard
                item={item?.user}
                key={index}
                applicationId={item?._id}
                onClick={
                  item?.resumeFile
                    ? () => window?.open(`${item?.resumeFile}`, "_blank")
                    : undefined
                }
                isSelected={item?.isSelected}
                mutate={mutate}
              />
            ))
          ) : (
            <div className="col-span-12">
              <Empty title="No student applied yet" />
            </div>
          )}
        </div>
      )}

      <div className="w-full flex flex-col items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(data?.totalCount || 1) / Number(data?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default PlacementAppliedStudent;
