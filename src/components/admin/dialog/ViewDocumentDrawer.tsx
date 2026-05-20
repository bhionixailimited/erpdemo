import { Close, RemoveRedEye } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useState } from "react";

const ViewDocumentDrawer = ({ _id, mutate }: { _id: string; mutate: any }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { data: docsData, mutate: docsMutate } = useSWRFetch<any>(
    `inventory/${_id}`
  );

  return (
    <>
      {" "}
      <div className="w-full">
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <div className="w-full  ">
            <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-4 ">
              <DialogTitle className="!font-semibold tracking-wide  !text-theme border-b !text-2xl text-center">
                Purchase Invoice
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenDialog(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                >
                  <Close />
                </IconButton>
              </DialogTitle>
            </div>
            <div className="w-full p-4">
              {docsData?.data?.allInvoice?.length ? (
                docsData?.data?.allInvoice?.map((item: any, i: number) => (
                  <div className="w-full flex flex-col" key={i}>
                    <h3 className="font-medium tracking-wide text-lg">
                      Stock Added : {item?.stockAdded || 0}
                    </h3>

                    <h3 className="font-medium tracking-wide">
                      Challan Number : {item?.challanNumber}
                    </h3>
                    <h3 className="font-medium tracking-wide">
                      Purchase Date :{" "}
                      {dayjs(item?.createdAt).format("DD-MMM-YYYY")}
                    </h3>
                    <h3 className="font-medium tracking-wide text-lg">
                      Remark: {item?.remark || ""}
                    </h3>
                    {item?.purchaseInvoiceUrl && (
                      <a
                        href={item?.purchaseInvoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button>View Invoice</Button>
                      </a>
                    )}

                    <hr />
                  </div>
                ))
              ) : (
                <h3>No Invoice</h3>
              )}
            </div>
          </div>
        </Dialog>
      </div>
      <span
        className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
        onClick={() => setOpenDialog(true)}
      >
        <Tooltip title="View Documents">
          <RemoveRedEye className="text-red-300" />
        </Tooltip>
      </span>
    </>
  );
};

export default ViewDocumentDrawer;
