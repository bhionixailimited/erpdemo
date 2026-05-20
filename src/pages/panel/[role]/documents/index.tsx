import { Add } from "@mui/icons-material";
import { UploadDoc, MyDocuments as DocView } from "components/admin";
import { Button } from "components/core";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";
import { useState } from "react";

const MyDocuments = () => {
  const [uploadDoc, setUploadDoc] = useState(false);
  const [reload, setReload] = useState(false);
  return (
    <PrivateLayout title="My Documents | View">
      <UploadDoc
        open={uploadDoc}
        onClose={() => setUploadDoc(false)}
        reload={() => setReload((prev) => !prev)}
        personal={true}
      />
      <section className="w-full container mx-auto px-4">
        <div className="w-full flex justify-between gap-4 rounded-lg items-center shadow-lg p-2 ">
          <span className="font-medium tracking-wide text-theme text-lg">
            My Documents
          </span>
          <Button endIcon={<Add />} onClick={() => setUploadDoc(true)}>
            Add Doc
          </Button>
        </div>
        <DocView refetch={reload} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedRoute(MyDocuments);
