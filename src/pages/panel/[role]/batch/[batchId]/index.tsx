import { BatchCalender } from "components/admin";
import { BatchLayout, BatchOverview } from "components/teachers";
import { useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BatchSection } from "./time-table";

const BatchDetails = () => {
  const { query, push } = useRouter();

  const { batchId } = query;
  const {
    data: batch,
    mutate,
    isValidating,
  } = useSWRFetch<any>(`batch/${batchId}`);

  const [selectBatchSectionName, setSelectBatchSectionName] =
    useState<string>("");
  useEffect(() => {
    // Check if batch and batchSection data is available
    if (batch?.data?.batchSection && batch.data.batchSection.length > 0) {
      setSelectBatchSectionName(batch.data.batchSection[0]);
    }
    // if (options && options.length > 0) {
    //   setSelectBatchSectionName(options[0]);
    // }
  }, [batch]);

  return (
    <BatchLayout>
      <div className="w-full flex items-start container mx-auto">
        <div className=" w-full">
          <BatchOverview />
          <BatchSection
            selectBatchSectionName={selectBatchSectionName}
            setSelectBatchSectionName={setSelectBatchSectionName}
            batch={batch}
            // options={options}
          />
          <BatchCalender
            viewOnly={true}
            selectBatchSectionName={selectBatchSectionName}
          />
        </div>
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(BatchDetails);
