import { SearchBar, StudyMaterial } from "components/common";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { MaterialSkeleton } from "../skeleton";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import dayjs from "dayjs";
import {
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from "@mui/material";
import { Button, Empty } from "components/core";
import DocCard from "./DocCard";
import { IDocument } from "types/document";
import { downloadFile, downloadZipFile, notify } from "utils";
import { Add, AddBox, Download } from "@mui/icons-material";
import UploadDoc, { selectType } from "./UploadDoc";

type dataType = {
  data: IDocument[];
  totalCount: number;
};

const ViewDocs = ({
  refetch,
  checked,
  onChange,
}: {
  refetch?: boolean;
  checked?: any;
  onChange?: any;
}) => {
  const { mutate } = useFetch();
  const [uploadDoc, setUploadDoc] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [selectTypeDoc, setSelectTypeDoc] = useState<string[]>([]);
  const [publishDate, setPublishDate] = useState<string[]>([]);
  const { user, switchInstitute } = useAuth();
  //perPage=20& -- if necessary
  const {
    data: docs,
    isValidating,
    mutate: docMutate,
  } = useSWRFetch<dataType>(
    `document?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (publishDate?.length && publishDate?.length > 0
        ? publishDate?.map((year) => `&uploadedYear=${year}`).join("")
        : "") +
      (selectTypeDoc?.length && selectTypeDoc?.length > 0
        ? selectTypeDoc?.map((type) => `&type=${type}`).join("")
        : "") +
      (["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role)) &&
      !switchInstitute
        ? "&isSuperAdminDoc=true"
        : "&isSuperAdminDoc=false")
  );
  useEffect(() => {
    docMutate();
  }, [reload]);

  const handleExportData = async () => {
    const response = await mutate({
      method: "GET",
      path:
        `document?exportData=true` +
        (selectTypeDoc?.length && selectTypeDoc?.length > 0
          ? selectTypeDoc?.map((type) => `&type=${type}`).join("")
          : "") +
        (publishDate?.length && publishDate?.length > 0
          ? publishDate?.map((year) => `&uploadedYear=${year}`).join("")
          : "") +
        (selectedItems?.length
          ? selectedItems?.reduce((acc, item) => {
              return acc + `&documentId=${item}`;
            }, ``)
          : ""),
    });
    if (response?.status !== 200) throw new Error("Zip download failed");

    const simplifyData = response?.data?.data?.data?.filter(
      (item: any) => item?.url?.length
    );

    downloadZipFile(
      (simplifyData || [])?.map((item: any, innerIndex: number) => ({
        url: item?.url,
        name: `${item?.title}`,
      }))
    );
  };
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // Function to handle checkbox changes
  const handleCheckboxChange = (itemId: string) => {
    // Check if the item is already selected
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // If it's selected, remove it from the selected items
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      // If it's not selected, add it to the selected items
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  return (
    <div className="flex flex-col w-full">
      <UploadDoc
        open={uploadDoc}
        onClose={() => setUploadDoc(false)}
        reload={() => setReload((prev) => !prev)}
      />
      <div className="w-full flex justify-between gap-4 rounded-lg items-center shadow-lg p-2 ">
        <span className="font-medium tracking-wide text-theme text-lg">
          Documents
        </span>
        <div className="flex gap-2 justify-end">
          <Button endIcon={<Add />} onClick={() => setUploadDoc(true)}>
            Add Doc
          </Button>
          <Button endIcon={<Download />} onClick={() => handleExportData()}>
            Export
          </Button>
        </div>
      </div>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        filterComp={
          (
            <SearchFilter
              selectTypeDoc={selectTypeDoc}
              setSelectTypeDoc={setSelectTypeDoc}
              publishDate={publishDate}
              setPublishDate={setPublishDate}
            />
          ) || undefined
        }
      />
      <div className="w-full">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4">
          {!docs || isValidating ? (
            <MaterialSkeleton i={4} />
          ) : docs?.data && docs?.data?.length > 0 ? (
            docs?.data?.map((item) => (
              <>
                <DocCard
                  docsCard="chairman"
                  url={item?.url}
                  _id={item?._id}
                  key={item?._id}
                  title={item?.title}
                  publishedAt={dayjs(item?.createdAt).format(
                    "MMM D, YYYY h:mm A"
                  )}
                  type={item?.type}
                  keywords={item?.keywords}
                  mutate={docMutate}
                  checked={selectedItems.includes(item?._id)}
                  onChange={() => handleCheckboxChange(item?._id)}
                />
              </>
            ))
          ) : (
            <div className="w-full col-span-12 flex items-center justify-center">
              <Empty title={"No documents found"} />
            </div>
          )}
        </div>
        {/* -------------------Pagination------------------- */}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(Number(docs?.totalCount || 1) / 20)}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </div>
    </div>
  );
};

export default ViewDocs;
const SearchFilter = ({
  setSelectTypeDoc,
  selectTypeDoc,
  publishDate,
  setPublishDate,
}: {
  selectTypeDoc?: string[];
  setSelectTypeDoc: Dispatch<SetStateAction<string[]>>;
  publishDate?: string[];
  setPublishDate: Dispatch<SetStateAction<string[]>>;
}) => {
  const selectTypeSchema = selectType; //get  selectType from UploadDocs Component

  const toggleSelectType = (genderId: string) => {
    if (selectTypeDoc?.includes(genderId)) {
      setSelectTypeDoc(selectTypeDoc?.filter((id) => id !== genderId));
    } else {
      setSelectTypeDoc([...(selectTypeDoc || []), genderId]);
    }
  };

  // filter by Publish year
  function getYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];

    // Create a range of 50 years before and after the current year
    for (let i = currentYear - 20; i <= currentYear; i++) {
      years.push(i.toString());
    }

    return years;
  }
  const years = getYearOptions();
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/*--------------------- Filter By Publish year------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Publish Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={publishDate}
          onChange={(event, value) => {
            setPublishDate(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Publish Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                onDelete={() => {
                  if (Array.isArray(publishDate)) {
                    const newValue = [...publishDate];
                    newValue.splice(index, 1); // Remove the selected option
                    setPublishDate(newValue);
                  }
                }}
                key={option}
              />
            ))
          }
        />
      </div>
      {/* ---------------------------Filter By Type------------------------------- */}
      {/* <Divider /> */}
      <div className="flex flex-col gap-1">
        {/* <Divider /> */}
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Type
          </h3>
        </div>
        <Divider />
        {selectTypeSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={selectTypeDoc?.includes(item?.value)}
              onClick={() => toggleSelectType(item?.value)}
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.label}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
