import { Add, ArrowForwardIos } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import { Empty } from "components/core";
import { AddPlacementData } from "components/form/admin";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
type dataType = {
  _id: number;
  totalPlaced: number;
}[];

const AllSessionPlacementData = () => {
  const { push } = useRouter();

  const [addPlacement, setAddPlacement] = useState(false);
  const { data, isValidating, mutate } =
    useSWRFetch<dataType>(`placement/year`);
  return (
    <>
      <AddPlacementData
        open={Boolean(addPlacement)}
        closeFn={() => setAddPlacement(false)}
        mutate={mutate}
      />
      <div className="w-full grid gap-4 grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <div
          className="w-full bg-white shadow-xl rounded-lg p-10 flex items-center justify-center border border-theme "
          onClick={() => setAddPlacement(true)}
        >
          <IconButton>
            <Add className="text-7xl text-theme" />
          </IconButton>
        </div>
        {isValidating ? (
          Array(8)
            .fill(0)
            .map((item, index) => (
              <>
                <div
                  className="w-full bg-white shadow-xl rounded-lg p-4"
                  key={index}
                >
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={150} />

                    <Skeleton variant="circular" height={50} width={50} />
                  </div>
                </div>
              </>
            ))
        ) : data?.length ? (
          data?.map((item, index) => (
            <div
              className="w-full border-b-4 border-b-theme bg-white shadow-xl rounded-lg p-4 min-h-[15rem] flex items-center justify-center"
              key={item?._id}
              onClick={() =>
                push(`/panel/admin/placement/archive/${item?._id}`)
              }
            >
              <div className="flex flex-col gap-2  items-center max-w-xs ">
                <h3 className="font-medium text-center text-theme tracking-wide text-base">
                  {/* University Placement Cell Report 20{index + 10}-{index + 11} */}
                  University Placement Cell Report {item?._id}
                </h3>
                <IconButton className="bg-gray-200 rounded-full text-4xl p-2 ">
                  <ArrowForwardIos />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12">
            <Empty title="No Reports Found" />
          </div>
        )}
      </div>
    </>
  );
};

export default AllSessionPlacementData;
