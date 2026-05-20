import { LibraryBookCard } from "components/cards";
import { SearchBar } from "components/common";
import { Button, Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import { BookType } from "types/book";
import { DriverSkeleton } from "./skeleton";
import {
  Pagination,
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import { AddBox, Download } from "@mui/icons-material";
import { downloadFile, notify } from "utils";
import CourseType from "types/course";
import BranchType from "types/branch";

type dataType = {
  data: BookType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
  isLastChunk: boolean;
};

const ViewLibraryBook = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [downloadType, setDownloadType] = useState("excel");
  const [completed, setCompleted] = useState<boolean>();
  const [batchId, setBatchId] = useState<string[]>([]);
  const [courseId, setCourseId] = useState("");
  const [authorId, setAuthorId] = useState<string[]>([]);
  const [publicationId, setPublicationId] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [branchId, setBranchId] = useState("");
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const [resultPublished, setResultPublished] = useState<boolean>();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  //perPage=12& ----if necessary ----batch publication author bookCategory
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `book?` +
      (!authorId?.length &&
      !publicationId?.length &&
      !batchId?.length &&
      !categoryId?.length &&
      !tagText &&
      !searchText
        ? `perPage=500&pageNo=${pageNo}`
        : `pageNo=1`) +
      (authorId?.length && authorId?.length > 0
        ? authorId?.map((authorId) => `&author=${authorId}`).join("")
        : "") +
      (publicationId?.length && publicationId?.length > 0
        ? publicationId
            ?.map((publicationId) => `&publication=${publicationId}`)
            .join("")
        : "") +
      (batchId?.length && batchId?.length > 0
        ? batchId?.map((batchId) => `&batch=${batchId}`).join("")
        : "") +
      (categoryId?.length && categoryId?.length > 0
        ? categoryId
            ?.map((categoryId) => `&bookCategory=${categoryId}`)
            .join("")
        : "") +
      (tagText ? `&tags=${tagText}` : "") +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) || 500
  );
  // console.log("data", data);
  return (
    <div className="w-full">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchTitle}
        filterComp={
          (
            <SearchFilter
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              authorId={authorId}
              setAuthorId={setAuthorId}
              publicationId={publicationId}
              setPublicationId={setPublicationId}
              setTagText={setTagText}
              tagText={tagText}
              branchId={branchId}
              setBranchId={setBranchId}
              setCourseId={setCourseId}
              courseId={courseId}
              setType={setDownloadType}
              type={downloadType}
              batchId={batchId}
              setBatchId={setBatchId}
              resultPublished={resultPublished}
              setResultPublished={setResultPublished}
              completed={completed}
              setCompleted={setCompleted}
            />
          ) || undefined
        }
        exportComp={
          (
            <ExportData
              authorId={authorId}
              setAuthorId={setAuthorId}
              publicationId={publicationId}
              setPublicationId={setPublicationId}
              setTagText={setTagText}
              tagText={tagText}
              setType={setDownloadType}
              type={downloadType}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              selectedRange={selectedRange as number}
              setSelectedRange={setSelectedRange}
              totalStudents={data?.totalCount}
              batchId={batchId}
              courseId={courseId}
              branchId={branchId}
              searchTitle={searchTitle}
              pageNo={pageNo}
              categoryId={categoryId}
            />
          ) || undefined
        }
      />

      {/* -----------------------Data Fetching-------------------------- */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-4 lg:grid-cols-3 xl:grid-cols-4 ">
        {isValidating ? (
          <DriverSkeleton
            i={8}
            className={
              "!w-full !col-span-1  md:!col-span-1 lg:!col-span-1 xl:!col-span-1"
            }
          />
        ) : data?.data && data?.data.length >= 1 ? (
          data?.data?.map((item) => (
            <LibraryBookCard
              mutate={mutate}
              _id={item?._id}
              key={item?._id}
              imageUrl={item?.imageUrl}
              author={item?.author?.name || "Not Provided"}
              bookIssue={item?.totalIssue || 0}
              title={item?.title}
              accessionNumber={item?.accessionNumber}
              price={item?.price}
              tags={item?.tags || []}
              totalStock={item?.quantity || 0}
              bookCategory={item?.bookCategory?.title}
              publication={item?.publication?.name}
            />
          ))
        ) : (
          <div className="col-span-12 ">
            <Empty title={"No Books Found"} />
          </div>
        )}
      </div>

      {/* -----------------------Pagination-------------------------- */}
      <div className="w-full flex items-center justify-center py-4">
        {!(
          authorId?.length ||
          publicationId?.length ||
          batchId?.length ||
          categoryId?.length ||
          tagText ||
          searchText
        ) && (
          <Pagination
            count={Math.ceil(
              Number(data?.totalCount || 1) / Number(data?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default ViewLibraryBook;
const exportFields = [
  { key: "author", value: "Author" },
  { key: "accessionNumber", value: "Accession No." },
  { key: "price", value: "price" },
  { key: "category", value: "Category" },
  { key: "title", value: "Title" },
  { key: "dateOfPublication", value: "Date of Publication" },
  { key: "publication", value: "Publication" },
  { key: "quantity", value: "Quantity" },
  { key: "totalIssue", value: "Total Issue" },
];
const downloadType = ["pdf", "csv", "excel"];
const ExportData = ({
  type,
  setType,
  selectedValues,
  setSelectedValues,
  selectedRange,
  setSelectedRange,
  totalStudents,
  courseId,
  branchId,
  batchId,
  pageNo,
  searchTitle,
  studentType,
  authorId,
  setAuthorId,
  publicationId,
  setPublicationId,
  setTagText,
  tagText,
  categoryId,
}: {
  categoryId?: string[];
  authorId?: string[];
  setAuthorId?: Dispatch<SetStateAction<string[]>>;
  publicationId?: string[];
  setPublicationId?: Dispatch<SetStateAction<string[]>>;
  setTagText?: Dispatch<SetStateAction<string>>;
  tagText?: string;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedRange?: Number;
  setSelectedRange: Dispatch<SetStateAction<Number>>;
  totalStudents?: number;
  courseId?: string;
  branchId?: string;
  batchId?: string[];
  pageNo?: number;
  searchTitle?: string;
  studentType?: string;
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const marks = [
    { value: 0, label: "0" },
    // { value: 30, label: "30" },
    // { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];
  const handleCheckboxClick = (itemId: string) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(itemId)) {
        // Deselect the checkbox if it was already selected
        return prevValues.filter((value) => value !== itemId);
      } else {
        if (type === "pdf" && prevValues?.length > 3) {
          notify.error("A maximum of 3 field can be choose in PDF type.");
          return prevValues;
        }

        // Select the checkbox if it was not already selected
        return [...prevValues, itemId];
      }
    });
  };
  const handleSelectAllClick = () => {
    if (selectAll) {
      // Deselect all checkboxes if "Select All" is currently checked
      setSelectedValues([]);
      setSelectAll(false);
    } else if (!selectAll && type === "pdf") {
      notify.error("A maximum of 3 field can be choose in PDF type.");
    } else {
      // Select all checkboxes if "Select All" is currently unchecked
      const allItemIds = exportFields.map((item) => item?.key);
      setSelectedValues(allItemIds);
      setSelectAll(true);
    }
  };
  const valuetext = (value: number) => {
    return `${value}`;
  };
  const valueLabelFormat = (value: number) => {
    return value.toString();
  };

  const handleExportData = () => {
    if (type === "pdf" && selectedValues && selectedValues?.length > 3) {
      notify.error("Can't select all the field in pdf type.");
      return;
    }
    downloadFile({
      method: "GET",
      type: type as any,
      url:
        `book/export?perPage=${selectedRange}&pageNo=${pageNo}` +
        (authorId?.length && authorId?.length > 0
          ? authorId?.map((authorId) => `&author=${authorId}`).join("")
          : "") +
        (publicationId?.length && publicationId?.length > 0
          ? publicationId
              ?.map((publicationId) => `&publication=${publicationId}`)
              .join("")
          : "") +
        (batchId?.length && batchId?.length > 0
          ? batchId?.map((batchId) => `&batch=${batchId}`).join("")
          : "") +
        (categoryId?.length && categoryId?.length > 0
          ? categoryId
              ?.map((categoryId: any) => `&bookCategory=${categoryId}`)
              .join("")
          : "") +
        (tagText ? `&tags=${tagText}` : "") +
        (searchTitle ? `&searchTitle=${searchTitle}` : "") +
        (downloadType ? `&downloadType=${type}` : "") +
        (selectedValues?.length
          ? selectedValues?.reduce((acc, item) => {
              return acc + `&fields=${item}`;
            }, ``)
          : ""),
    });
  };

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <div className="flex items-center py-4 gap-4 justify-between">
        <div className="flex gap-1">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose fields to export
          </h3>
        </div>
        <Button
          disabled={!selectedValues?.length || !type?.length}
          startIcon={<Download />}
          onClick={handleExportData}
        >
          Generate
        </Button>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={selectAll}
            onClick={handleSelectAllClick}
            color="primary"
          />
          <h3 className="font-semibold tracking-wide text-sm text-theme">
            Select All
          </h3>
        </div>
        {exportFields?.map((item: any) => (
          <div key={item?._id} className="flex items-center gap-4">
            <Checkbox
              size="small"
              // checked={item?._id === batchId}
              checked={selectedValues?.includes(item?.key)}
              onClick={() => handleCheckboxClick(item?.key)}
            />
            <h3 className="font-medium  tracking-wide text-sm ">
              {item?.value}
            </h3>
          </div>
        ))}

        <div className="flex items-center pt-4 px-2 gap-2">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose export type *
          </h3>
        </div>
        <div className="w-full flex px-3.5 gap-2  pb-2">
          <RadioGroup
            name="downloadType"
            value={type}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setType(event.target.value);
            }}
            row
          >
            {downloadType.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center pt-4 px-2 gap-2">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose Range *
          </h3>
        </div>
        <div className="w-full flex px-5 pt-2 gap-2  pb-4">
          <Slider
            aria-label="Always visible"
            defaultValue={500}
            value={selectedRange as number}
            valueLabelFormat={valueLabelFormat}
            marks={marks}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            min={0}
            max={totalStudents}
            onChange={(event: Event, value: number | number[]) => {
              setSelectedRange(value as number);
            }}
            className="animate-slide"
          />
        </div>
      </div>
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Course
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {courseLoading ? (
          <Skeleton animation="wave" />
        ) : (
          course?.data?.map((item: CourseType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === courseId}
                onClick={() =>
                  setCourseId(item?._id === courseId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setCoursePageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {coursePageNo}
          </span>
          <button
            disabled={course?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setCoursePageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Branch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {branchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          branch?.data?.map((item: BranchType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === branchId}
                onClick={() =>
                  setBranchId(item?._id === branchId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setBranchPageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {branchPageNo}
          </span>
          <button
            disabled={branch?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setBranchPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Status
        </h3>
      </div>
      <Divider />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={completed === false}
            onClick={() =>
              setCompleted((prev) => (prev === false ? undefined : false))
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Ongoing</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={completed === true}
            onClick={() => setCompleted((prev) => (prev ? undefined : true))}
          />
          <h3 className="font-medium  tracking-wide text-sm">Completed</h3>
        </div>
      </div> */}

      {/* <Divider /> */}
    </div>
  );
};

const SearchFilter = ({
  setCompleted,
  completed,
  setBatchId,
  batchId,
  resultPublished,
  setResultPublished,
  type,
  setType,
  setCourseId,
  courseId,
  branchId,
  setBranchId,
  categoryId,
  setCategoryId,
  authorId,
  setAuthorId,
  publicationId,
  setPublicationId,
  setTagText,
  tagText,
}: {
  setTagText: Dispatch<SetStateAction<string>>;
  tagText: string;
  authorId: string[];
  setAuthorId: Dispatch<SetStateAction<string[]>>;
  publicationId: string[];
  setPublicationId: Dispatch<SetStateAction<string[]>>;
  batchId: string[];
  setBatchId: Dispatch<SetStateAction<string[]>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  resultPublished?: boolean;
  setResultPublished: Dispatch<SetStateAction<boolean | undefined>>;
  completed?: boolean;
  setCompleted: Dispatch<SetStateAction<boolean | undefined>>;
  courseId?: string;
  setCourseId: Dispatch<SetStateAction<string>>;
  branchId?: string;
  setBranchId: Dispatch<SetStateAction<string>>;
  categoryId?: string[];
  setCategoryId: Dispatch<SetStateAction<string[]>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);
  const [categoryPageNo, setCategoryPageNo] = useState(1);
  const [publicationPage, setPublication] = useState(1);
  const [authorPage, setAuthorPage] = useState(1);

  const { user } = useAuth();

  const { data: course, isValidating: courseLoading } = useSWRFetch<any>(
    `course?perPage=5&pageNo=${coursePageNo}`
  );
  const { data: branch, isValidating: branchLoading } = useSWRFetch<any>(
    `branch?perPage=5&pageNo=${branchPageNo}`
  );

  // --------------------------Filter by Batch----------------------------------
  //perPage=5& --- if needed for pagination
  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    `batch?pageNo=${pageNo}&session=true&course=true&branch=true&session=true`
  );
  const [batchItem, setBatchItem] = useState<any>([]);
  const handleBatchChange = (event: React.SyntheticEvent, value: any) => {
    // console.log(value);
    setBatchItem(value);
    setBatchId && setBatchId(value?.map((item: any) => item?._id));
  };

  // ----------------------------------Filter By Publication------------------------
  //perPage=5&   --- if needed for pagination
  const { data: publication, isValidating: publicationLoading } =
    useSWRFetch<dataType>(`publication?pageNo=${publicationPage}`);

  const [publicationItem, setPublicationItem] = useState<any>([]);
  const handlePublicationChange = (event: React.SyntheticEvent, value: any) => {
    // console.log(value);
    setPublicationItem(value);
    setPublicationId && setPublicationId(value?.map((item: any) => item?._id));
  };

  // ----------------------------------Filter By Author------------------------
  //perPage=5& ---- if needed for pagination
  const { data: author, isValidating: authorLoading } = useSWRFetch<dataType>(
    `author?pageNo=${authorPage}`
  );
  const [authorItem, setAuthorItem] = useState<any>([]);
  const handleAuthorChange = (event: React.SyntheticEvent, value: any) => {
    // console.log(value);
    setAuthorItem(value);
    setAuthorId && setAuthorId(value?.map((item: any) => item?._id));
  };
  // ----------------------------------Filter By Category------------------------
  //perPage=5& ---- if needed for pagination
  const { data: bookCategory, isValidating: categoryLoading } =
    useSWRFetch<any>(`book-category?pageNo=${categoryPageNo}`);
  const [bookCategoryItem, setBookauthorItem] = useState<any>([]);
  const handleBookAuthorChange = (event: React.SyntheticEvent, value: any) => {
    // console.log(value);
    setBookauthorItem(value);
    setCategoryId && setCategoryId(value?.map((item: any) => item?._id));
  };

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* --------------------------Filter by Batch------------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Batch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="department-filter"
          options={batch?.data || []}
          value={batchItem}
          getOptionLabel={(option) => option.course?.title} // Display the title
          onChange={handleBatchChange}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Batch"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option) => (
              <Chip
                label={option.course?.title} // Display the title
                {...getTagProps({ index: option._id })} // Use the ID as the index
                key={option._id}
              />
            ))
          }
        />
      </div>

      {/* --------------------------Filter by Publication------------------------- */}
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Publication
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="department-filter"
          options={publication?.data || []}
          value={publicationItem}
          getOptionLabel={(option: any) => option?.name} // Display the title
          onChange={handlePublicationChange}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Publication"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option: any) => (
              <Chip
                label={option?.name} // Display the title
                {...getTagProps({ index: Number(option._id) })} // Use the ID as the index
                key={option._id}
              />
            ))
          }
        />
      </div>

      {/* --------------------------Filter by Author------------------------- */}
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Author
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="department-filter"
          options={author?.data || []}
          value={authorItem}
          getOptionLabel={(option: any) => option?.name} // Display the title
          onChange={handleAuthorChange}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Author"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option: any) => (
              <Chip
                label={option?.name} // Display the title
                {...getTagProps({ index: Number(option._id) })} // Use the ID as the index
                key={option._id}
              />
            ))
          }
        />
      </div>
      {/* --------------------------Filter by Category------------------------- */}
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Category
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="department-filter"
          options={bookCategory?.data || []}
          value={bookCategoryItem}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleBookAuthorChange}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Category"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: Number(option._id) })} // Use the ID as the index
                key={option._id}
              />
            ))
          }
        />
      </div>
      {/* -------------------------------Filter By Tag------------------------------------ */}
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Tag
        </h3>
      </div>
      <Divider />

      <div className="flex flex-col gap-1">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setTagText(e.target.value)}
        />
      </div>

      <Divider />
      {/*------------------Filter By Batch lll---------------- */}
      {/* <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Batch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {batchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          batch?.data?.map((item: any) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === batchId}
                onClick={() =>
                  setBatchId(item?._id === batchId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.course?.title + " " + item?.branch?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setPageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {pageNo}
          </span>
          <button
            disabled={batch?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
      {/*------------------Filter By Publication---------------- */}
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Publication
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {publicationLoading ? (
          <Skeleton animation="wave" />
        ) : (
          publication?.data?.map((item: any) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === publicationId}
                onClick={() =>
                  setPublicationId(item?._id === publicationId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.name}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setPublication((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {publicationPage}
          </span>
          <button
            disabled={publication?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setPublication((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
      {/*------------------Filter By Author---------------- */}
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Author
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {authorLoading ? (
          <Skeleton animation="wave" />
        ) : (
          author?.data?.map((item: any) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === authorId}
                onClick={() =>
                  setAuthorId(item?._id === authorId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.name}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setAuthorPage((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {authorPage}
          </span>
          <button
            disabled={author?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setAuthorPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Category
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {categoryLoading ? (
          <Skeleton animation="wave" />
        ) : (
          bookCategory?.data?.map((item: BranchType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === categoryId}
                onClick={() =>
                  setCategoryId(item?._id === categoryId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() =>
              setCategoryPageNo((prev) => (prev > 1 ? prev - 1 : 1))
            }
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {categoryPageNo}
          </span>
          <button
            disabled={bookCategory?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setCategoryPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
};
