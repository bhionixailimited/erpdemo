import MaterialTable from "@material-table/core";
import { Delete } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ANNOUNCEMENT } from "assets/animations";
import { AssignTeacherDialog } from "components/admin/dialog";
import { BatchLayout } from "components/teachers";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import SubjectType from "types/subject";
import UserType from "types/user";
import { MuiTblOptions, notify } from "utils";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ANNOUNCEMENT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
type dataType = {
  data: {
    subject: SubjectType;
    teacher: UserType;
    createdAt: string;
    _id: string;
  }[];
};
const AssignTeacher = () => {
  const { push, query } = useRouter();
  const { mutate: teacher } = useFetch();
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `batch/${query?.batchId}/teacher`
  );
  // console.log("data--assign teacher-->", data);
  const handleDelete = async (id: string, subjectId?: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await teacher({
              path:
                `batch/${query?.batchId}/teacher-remove/${id}` +
                (subjectId ? `?subjectId=${subjectId}` : ""),
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BatchLayout>
      <div className="w-full">
        <div className="w-full flex flex-col md:flex-row items-center gap-4 justify-between mb-4 bg-white shadow-xl rounded-lg p-4">
          <h3 className="font-medium tracking-wide text-lg">Assign Teacher</h3>
          <AssignTeacherDialog Dmutate={mutate} />
        </div>
        <MaterialTable
          components={{
            Container: (props) => (
              <Paper {...props} className="!bg-indigo-50" />
            ),
          }}
          title={""}
          isLoading={isValidating}
          data={
            data?.data?.map((item, i) => ({
              ...item,
              sl: i + 1,
              teacherEmail: item?.teacher?.email,
              subjectName: item?.subject?.title,
              isTheory: item?.subject?.isTheory,
              timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
              phoneNumber: `+${item?.teacher?.countryCode} ${item?.teacher?.phoneNumber}`,
            })) || []
          }
          options={{ ...MuiTblOptions() }}
          columns={[
            {
              title: "#",
              field: "sl",
              editable: "never",
              width: "2%",
            },
            {
              export: false,
              title: "Teacher Profile",
              tooltip: "profile",
              searchable: true,
              field: "staff",
              render: (row: any) => (
                <>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar src={row?.teacher?.photoUrl} alt={"img"} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          className="!font-semibold"
                          component="span"
                          variant="body2"
                        >
                          {row?.teacher?.displayName || ""}
                        </Typography>
                      }
                      secondaryTypographyProps={{
                        fontWeight: "500",
                      }}
                      secondary={row?.teacher?.email || ""}
                      //   secondary={phoneNumber}
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: "Name",
              field: "name",
              searchable: true,
              export: false,
              hidden: true,
            },
            {
              title: "Phone Number",
              field: "phoneNumber",
              searchable: true,
              export: false,
            },
            {
              title: "Email",
              field: "teacherEmail",
              searchable: true,
              hidden: true,
              export: true,
            },
            {
              title: "Subject",
              field: "subjectName",
              searchable: true,
              render: ({ subjectName, isTheory }) => subjectName,
              //  + `  (${isTheory ? "Theory" : "Lab"})`,
            },
            //+ isTheory ? "Theory" : "Lab"
            // {
            //   title: "Message",
            //   field: "message",
            //   searchable: true,
            //   render: ({ message }) =>
            //     message?.length > 10 ? message?.slice(0, 7) + "..." : message,
            // },

            {
              title: "Timestamp",
              field: "createdAt",
              render: ({ createdAt }: any) =>
                dayjs(new Date(createdAt)).format("MMM D, YYYY h:mm A"),
            },

            {
              title: "Action",
              export: false,
              render: (rowData) => (
                <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
                  <span
                    onClick={() =>
                      handleDelete(rowData?.teacher?._id, rowData?.subject?._id)
                    }
                    className=" px-3 py-2 bg-transparent hover:bg-red-200/50 transition-all ease-in-out duration-300 cursor-pointer"
                  >
                    <Delete className="text-red-500" />
                  </span>
                </div>
              ),
            },
          ]}
          // detailPanel={({ rowData }) => {
          //   return (
          //     <div className="bg-eef5f9 m-auto p-[20px]">
          //       <Card
          //         sx={{
          //           minWidth: 275,
          //           maxWidth: 700,
          //           transition: "0.3s",
          //           margin: "auto",
          //           borderRadius: "10px",
          //           fontWeight: "bolder",
          //           wordWrap: "break-word",
          //           padding: "20px",
          //           boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          //           "&:hover": {
          //             boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          //           },
          //         }}
          //       >
          //         <CardContent>
          //           <h1 className="mb-[5px] text-lg text-indigo-900">
          //             Message
          //           </h1>
          //           <p className="break-words text-base font-bold">
          //             {rowData?.message}
          //           </p>
          //         </CardContent>
          //       </Card>
          //     </div>
          //   );
          // }}
          // actions={[
          //   {
          //     icon: 'delete',
          //     tooltip: 'Delete',
          //     onClick: (event, rowData) => {
          //       console.log(rowData)
          //     },
          //   },

          // ]}
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh Data",
              isFreeAction: true,
              onClick: () => mutate(),
            },
          ]}
        />
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(AssignTeacher);
