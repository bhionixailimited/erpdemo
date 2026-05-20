import {
  Add,
  DesignServices,
  Done,
  FileDownload,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  Button,
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import DesignationType from "types/designation";
import { InventorySupplyType } from "types/inventorysupply";
import { notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "3",
    name: "name",
    label: "Author Name*",
    initialValue: "",
    validationSchema: Yup.string().required("Publication Name is required."),
    type: "text",
  },
  {
    key: "3dd",
    name: "bio",
    label: "Bio*",
    initialValue: "",
    validationSchema: Yup.string().required("Bio is required."),
    type: "text",
    rows: 4,
    multiline: true,
  },
];

const initialValues = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {}
);
const validationSchema = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {}
);
type Props = {
  data: InventorySupplyType;
  Dmutate?: KeyedMutator<any>;
};
const AddBookAuthorDialog = ({ data, Dmutate }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate } = useFetch();

  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
        >
          <div className="w-full p-4 ">
            <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
              Download
            </h3>
          </div>
        </CustomDialog>
      </div>

      <Button onClick={() => setOpenDialog(true)} endIcon={<FileDownload />}>
        Download Report
      </Button>
    </>
  );
};

export default AddBookAuthorDialog;
