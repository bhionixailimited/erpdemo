import { SearchBar } from "components/common";
import React from "react";
import AllExams from "./AllExams";
import { useState, useDeferredValue } from "react";

const ViewExam = () => {
  const [searchText, setSearchText] = useState("");

  const searchTitle = useDeferredValue(searchText);

  return (
    <div className="w-full flex-col gap-8 flex overflow-hidden pb-10">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <AllExams searchTitle={searchTitle} />
    </div>
  );
};

export default ViewExam;
