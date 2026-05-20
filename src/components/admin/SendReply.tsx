import { Cancel, Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextFieldProps,
} from "@mui/material";
// import { post } from 'api'
// import { TextInput } from 'components'
// import { BASE_URL } from "configs";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
type Props = {
  selectedUsers?: any;
  handleClose: () => void;
};
const MessageSchema = [
  {
    key: "1",
    label: "Enter Subject",
    head: "Subject",
    name: "subject",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string()
      .required("required")
      .min(3, "Subject  must be at least 3 characters*"),
    multiline: false,
    rows: 1,
  },
  {
    key: "2",
    head: "Message",
    label: "Enter Message",
    name: "message",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string()
      .required("required")
      .min(10, "Subject  must be at least 10 characters*"),
    multiline: true,
    rows: 5,
  },
];
const SendReply = ({ selectedUsers, handleClose }: Props) => {
  const initialValues = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });
  const validationSchema = MessageSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });

  const handleSendReply = async () => {};
  return (
    <>
      <Dialog
        open={Boolean(selectedUsers?.email)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSendReply}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <DialogTitle>Send Reply</DialogTitle>
              <DialogContent dividers>
                {MessageSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div className="flex flex-col w-full">
                        <p className="text-lg font-semibold">
                          {inputItem.head}
                        </p>
                        <TextField
                          size="medium"
                          variant="outlined"
                          className="w-9/12 md:w-full !rounded-2xl"
                          margin="dense"
                          label={inputItem.label}
                          error={Boolean(
                            props.meta.touched && props.meta.error
                          )}
                          helperText={props.meta.touched && props.meta.error}
                          multiline={inputItem.multiline}
                          rows={inputItem.rows}
                          {...props.field}
                        />
                      </div>
                    )}
                  </Field>
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleClose}
                  color="error"
                >
                  Close
                </Button>
                <LoadingButton
                  variant="contained"
                  startIcon={<Send />}
                  disabled={!isValid}
                  loading={isSubmitting}
                  color="success"
                  className="btn-background !bg-theme"
                  type="submit"
                >
                  Send
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default SendReply;
