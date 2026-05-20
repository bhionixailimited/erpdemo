import { Add, Download } from "@mui/icons-material";
import { UploadDoc, ViewDocs } from "components/admin";
import { Button } from "components/core";
import { useFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useState } from "react";
import { downloadFile, downloadZipFile } from "utils";

const DocsIndexPage = () => {
  return (
    <PrivateLayout title="Document | View">
      <section className="w-full container mx-auto px-4">
        <ViewDocs />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(DocsIndexPage);
