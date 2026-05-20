import { AddBox, DoneAll, Remove, UploadFile } from "@mui/icons-material";
import { Checkbox, Divider } from "@mui/material";
import {
  AddBatchPromoteDialog,
  AddBatchSectionDialog,
} from "components/admin/dialog";
import { StudentSkeleton } from "components/admin/skeleton";
import { SearchBar } from "components/common";
import StudentCardBatch from "components/common/StudentCardBatch";
import { Button, Empty } from "components/core";
import { BatchLayout } from "components/teachers";
import { useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import UserType from "types/user";
import { downloadFile } from "utils";

type dataType = {
  data: UserType[];
  totalCount: number;
};
const BatchDetails = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [setPromoteDemote, isSetPromoteDemote] = useState<string>("");
  const [status, setStatus] = useState("all");
  const searchTitle = useDeferredValue(searchText?.trim());
  const [batchSections, setBatchSections] = useState<string>("");
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { batchId } = useRouter().query;
  //perPage=20& ---- if necessary
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    batchId &&
      `batch/${batchId}/students?pageNo=${pageNo}` +
        (setPromoteDemote ? `&promoteStatus=${setPromoteDemote}` : "") +
        (batchSections ? `&batchSection=${batchSections}` : "") +
        // (status !== undefined && status !== "all"
        //   ? `&currentStudent=${status}`
        //   : status === "all"
        //   ? ""
        //   : "") +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );

  const handleExport = () => {
    downloadFile({
      method: "GET",
      type: downloadType as any,
      //perPage=20& -- if necessary put into url
      url:
        `batch/${batchId}/students-export?pageNo=${pageNo}` +
        (setPromoteDemote ? `&promoteStatus=${setPromoteDemote}` : "") +
        (batchSections ? `&batchSection=${batchSections}` : "") +
        // (selectedItems?.length && selectedItems?.length > 0
        //   ? selectedItems?.map((id) => `&studentId=${id}`).join("")
        //   : "") +
        // (status !== undefined && status !== "all"
        //   ? `&currentStudent=${status}`
        //   : status === "all"
        //   ? ""
        //   : "") +
        (searchTitle ? `&searchTitle=${searchTitle}` : "") +
        (downloadType ? `&downloadType=${downloadType}` : "") +
        (selectedItems?.length
          ? selectedItems?.reduce((acc, item) => {
              return acc + `&exportIds=${item}`;
            }, ``)
          : ""),
    });
  };
  const handleSelectAll = () => {
    if (data?.data && Array.isArray(data.data)) {
      const allItemIds: string[] = data.data
        .map((item) => item?.user?._id)
        .filter(Boolean);
      setSelectedItems(allItemIds);
    }
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };
  // Function to handle checkbox changes
  const handleCheckboxChange = (itemId: string) => {
    // Check if the item is already selected
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // If it's selected, remove it from the selected items
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      // setSelectedRange((prev) => prev - 1 || 0);
    } else {
      // If it's not selected, add it to the selected items
      setSelectedItems([...selectedItems, itemId]);
      // setSelectedRange((prev) => prev - 1 || 0);
    }
  };

  return (
    <BatchLayout>
      <div className="w-full">
        <span className="flex gap-2">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            filterComp={
              (
                <SearchFilter
                  setPromoteDemote={setPromoteDemote}
                  isSetPromoteDemote={isSetPromoteDemote}
                  status={status}
                  setStatus={setStatus}
                  batchSections={batchSections}
                  setBatchSections={setBatchSections}
                  batchId={batchId as string}
                />
              ) || undefined
            }
          />
          <div className="p-2 md:p-4 rounded-md shadow-md bg-gradient-to-r from-theme/90 to-theme">
            <Button
              // disabled={!data?.data?.length}
              startIcon={<UploadFile />}
              className="!bg-white !text-theme !rounded-md"
              onClick={() => handleExport()}
            >
              Export
            </Button>
          </div>
        </span>
        {selectedItems?.length ? (
          <div className="mt-2 gap-2 flex justify-end">
            <Button startIcon={<DoneAll />} onClick={handleSelectAll}>
              {" "}
              Select All
            </Button>
            <Button startIcon={<Remove />} onClick={handleDeselectAll}>
              {" "}
              Deselect All
            </Button>
            <AddBatchPromoteDialog
              mutate={mutate}
              studentIds={selectedItems}
              type={"promote"}
            />
            <AddBatchPromoteDialog
              mutate={mutate}
              studentIds={selectedItems}
              type={"demote"}
            />
            <AddBatchSectionDialog mutate={mutate} studentIds={selectedItems} />
          </div>
        ) : (
          ""
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4 gap-4 ">
          {isValidating ? (
            <div className="col-span-12 flex gap-4 w-full">
              <StudentSkeleton i={1} />
              <StudentSkeleton i={1} />
              <StudentSkeleton i={1} />
              <StudentSkeleton i={1} />
            </div>
          ) : data?.data?.length ? (
            data?.data?.map((item, index) => (
              <div key={index} className="w-full ">
                <StudentCardBatch
                  data={item as any}
                  noDrawer={true}
                  type={"STUDENT"}
                  mutate={mutate}
                  checked={selectedItems?.includes(item?.user?._id)}
                  onChange={() => handleCheckboxChange(item?.user?._id)}
                />
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center col-span-12">
              <Empty title="No student available" />
            </div>
          )}
        </div>
        {/* -------------------------Pagination--------------------------- */}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(Number(data?.totalCount || 1) / 20)}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(BatchDetails);
const SearchFilter = ({
  setPromoteDemote,
  isSetPromoteDemote,
  status,
  setStatus,
  batchSections,
  setBatchSections,
  batchId,
}: {
  setPromoteDemote: string;
  isSetPromoteDemote: Dispatch<SetStateAction<string>>;
  status: any;
  setStatus: Dispatch<SetStateAction<any>>;
  batchSections: string;
  setBatchSections: Dispatch<SetStateAction<any>>;
  batchId: string;
}) => {
  const promoteDemoteSchema = [
    { key: "1", title: "PROMOTED", value: "PROMOTED" },
    { key: "2", title: "DEMOTED", value: "DEMOTED" },
  ];

  const { data: singleBatch } = useSWRFetch<any>(batchId && `batch/${batchId}`);
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* ---------------------------Filter By Promote or Demote------------------------------- */}
      <div className="flex flex-col gap-1">
        {/* <Divider /> */}
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Promote or Demote
          </h3>
        </div>
        <Divider />
        {promoteDemoteSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={setPromoteDemote === item?.value}
              onClick={() =>
                isSetPromoteDemote((prev) =>
                  prev === item?.value ? "" : item.value
                )
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))}
        <Divider />
        {/* Filter By Status */}
        {/* <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Status
          </h3>
        </div>
        <Divider />
        {statusSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={status === item?.value}
              onClick={() =>
                setStatus((prev: any) =>
                  prev === item?.value ? "" : item.value
                )
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))} */}

        {/* --------------------Filter By Section---------------- */}
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Section
          </h3>
        </div>
        <Divider />
        {singleBatch?.data?.batchSection?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={batchSections === item}
              onClick={() =>
                setBatchSections((prev: any) => (prev === item ? "" : item))
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">{item}</h3>
          </div>
        ))}
      </div>
      <Divider />

      {/* --------------------------------search By Caste----------------------------------- */}
    </div>
  );
};
