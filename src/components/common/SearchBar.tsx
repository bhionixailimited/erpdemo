import {
  AddBox,
  FilterList,
  Search,
  Sort,
  UploadFile,
} from "@mui/icons-material";
import {
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Button, InputField } from "components/core";
import { Dispatch, SetStateAction, useState } from "react";
import { CSVLink } from "react-csv";

const SearchBar = ({
  sortComp,
  filterComp,
  setSearchText,
  searchText = "",
  data,
  exportComp,
}: {
  filterComp?: JSX.Element;
  sortComp?: JSX.Element;
  exportComp?: JSX.Element;
  setSearchText?: Dispatch<SetStateAction<string>>;
  searchText?: string;
  data?: string[][];
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  const handleClose = () => {
    setOpenFilter(false);
    setOpenSort(false);
    setOpenExport(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="w-full overflow-hidden overflow-y-auto max-w-[100vw] ">
        <div className="w-full p-2 md:p-4 relative z-50 rounded-md shadow-md gap-2 md:gap-4 flex-col md:flex-row flex items-center bg-gradient-to-r from-theme/90 to-theme text-black ">
          <div className="w-full">
            <InputField
              type="text"
              className="w-full !h-10 !border-white text-black hover:!border-theme !rounded-md !shadow-lg !bg-white "
              placeholder="Search for result..."
              variant="outlined"
              InputProps={{
                startAdornment: <Search className="mr-4 text-gray-500 " />,
              }}
              onChange={(e) => setSearchText?.(e?.target?.value)}
              value={searchText}
            />
          </div>
          <div className=" w-full md:w-fit flex justify-between items-center gap-2 lg:gap-4">
            {filterComp && (
              <Button
                startIcon={<FilterList />}
                className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filter
              </Button>
            )}

            {sortComp && (
              <Button
                startIcon={<Sort />}
                className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                onClick={() => setOpenSort(!openSort)}
              >
                {" "}
                Sort
              </Button>
            )}

            {exportComp && (
              <Button
                startIcon={<UploadFile />}
                className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                onClick={() => setOpenExport(!openExport)}
              >
                Export
              </Button>
            )}
            {data?.length && (
              <CSVLink
                data={data || []}
                target="_blank"
                filename="yard-erp.csv"
              >
                <Button
                  startIcon={<UploadFile />}
                  className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                >
                  Export
                </Button>
              </CSVLink>
            )}
          </div>

          <div
            className={`fixed top-0 w-fit z-[500] right-0 transition-all ease-in-out duration-300 h-screen bg-white  min-w-[20rem] ${
              openFilter ? "translate-x-0" : "translate-x-[120%]"
            } `}
          >
            {filterComp}
          </div>

          <div
            className={`fixed top-0 w-fit z-[9999] right-0 transition-all ease-in-out duration-300 h-screen bg-white min-w-[20rem] ${
              openSort ? "translate-x-0" : "translate-x-[120%]"
            } `}
          >
            {sortComp}
          </div>
          <div
            className={`fixed top-0 w-fit z-[9999] right-0 transition-all ease-in-out duration-300 h-screen bg-white max-w-[80vw] md:min-w-[30rem] ${
              openExport ? "translate-x-0" : "translate-x-[120%]"
            } `}
          >
            {exportComp}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;

const SearchFilter = () => {
  return (
    <div className="w-full  p-4">
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Percentage
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">40% below</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">41% - 50%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">51% - 60%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">61% - 70%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">71% - 80%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">81% - 90%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">90% above</h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Attempt
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">40% below</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">41% - 60%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">61% - 80%</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">80% above</h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter Type
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">Boys</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">Girls</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox size="small" />
          <h3 className="font-medium  tracking-wide text-sm">Others</h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Date
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <InputField type="date" className="w-full !h-10 " />
      </div>
    </div>
  );
};

const SortFilter = () => {
  return (
    <div className="w-full  p-4">
      <div className="flex items-center py-4 gap-4">
        <Sort className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Sort By Category
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <RadioGroup
          aria-labelledby="search-sort-radio"
          defaultValue="default"
          name="search-sort"
        >
          <FormControlLabel
            value="default"
            control={<Radio />}
            label="Sort By Default"
          />
          <FormControlLabel
            value="a-z"
            control={<Radio />}
            label="Sort Alphabetically(A-Z)"
          />
          <FormControlLabel
            value="z-a"
            control={<Radio />}
            label="Sort Alphabetically(Z-A)"
          />
          <FormControlLabel
            value="sortByAttempt"
            control={<Radio />}
            label="Sort By Attempt"
          />
          <FormControlLabel
            value="sortBySubmit"
            control={<Radio />}
            label="Sort By Submit Date"
          />
        </RadioGroup>
      </div>
    </div>
  );
};
