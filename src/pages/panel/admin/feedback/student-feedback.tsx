import { Check, Quickreply, RemoveCircle } from "@mui/icons-material";
import { Avatar, Checkbox } from "@mui/material";
import { SendReply } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useState } from "react";

const StudentFeedback = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const grievances = [
    {
      sl: 1,
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      email: "johndoe@yarderp.com",
      name: "John Doe",
      subject: "Regarding School Fees",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis  dolores nemo velit sed ducimus. Exercitationem suscipit quas deleniti error corrupti quaerat, nam assumenda corporis perspiciatis eum laudantium beatae soluta fugit quos repellat. Non ex voluptatum quos nulla. Consequatur, provident non a error unde voluptatibus sit sapiente delectus, ipsa, facilis ipsam.",
    },
    {
      sl: 2,
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      email: "johndoe@yarderp.com",
      name: "John Doe",
      subject: "Regarding School Fees",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis  dolores nemo velit sed ducimus. Exercitationem suscipit quas deleniti error corrupti quaerat, nam assumenda corporis perspiciatis eum laudantium beatae soluta fugit quos repellat. Non ex voluptatum quos nulla. Consequatur, provident non a error unde voluptatibus sit sapiente delectus, ipsa, facilis ipsam.",
    },
    {
      sl: 3,
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      email: "johndoe@yarderp.com",
      name: "John Doe",
      subject: "Regarding Exam result",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis  dolores nemo velit sed ducimus. Exercitationem suscipit quas deleniti error corrupti quaerat, nam assumenda corporis perspiciatis eum laudantium beatae soluta fugit quos repellat. Non ex voluptatum quos nulla. Consequatur, provident non a error unde voluptatibus sit sapiente delectus, ipsa, facilis ipsam.",
    },
    {
      sl: 4,
      image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      email: "johndoe@yarderp.com",
      name: "John Doe",
      subject: "Regarding Exam result",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis  dolores nemo velit sed ducimus. Exercitationem suscipit quas deleniti error corrupti quaerat, nam assumenda corporis perspiciatis eum laudantium beatae soluta fugit quos repellat. Non ex voluptatum quos nulla. Consequatur, provident non a error unde voluptatibus sit sapiente delectus, ipsa, facilis ipsam.",
    },
  ];

  return (
    <PrivateLayout title="Yard-ERP | Student Feedback ">
      <div className="m-auto container px-8 py-4">
        <SendReply
          selectedUsers={selectedUsers}
          handleClose={() => setSelectedUsers(false as any)}
        />
        <div className="w-full flex items-start  gap-4">
          <div className="w-full flex flex-col gap-4">
            {grievances?.map((item, index) => (
              <div
                className="w-full bg-white shadow-xl rounded-lg p-4 "
                key={index}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="!h-12 !w-12" />
                  <div className="flex flex-col gap-1 ">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-theme tracking-wide text-xl">
                        {item?.subject}
                      </h3>

                      <span className="bg-theme rounded-md shadow-lg flex items-center gap-1 px-2 text-xs py-1 text-white">
                        <h3>Replied</h3>
                        <Check fontSize="small" />
                      </span>
                    </div>

                    <h3 className="font-medium tracking-wide text-sm text-gray-500">
                      Send on 12/05/2023 12:00 PM
                    </h3>
                  </div>
                </div>
                <p className="tracking-wide p-4 text-gray-700 font-medium">
                  {item?.message}
                </p>
                <div className="flex items-center">
                  <span className=" cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md flex items-center gap-2 text-red-500 pr-4 ">
                    <RemoveCircle />
                    <h3 className="font-medium tracking-wide text-base">
                      Remove Query
                    </h3>
                  </span>
                  <span
                    className=" cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md flex items-center gap-2 text-blue-500 pr-4 "
                    onClick={() => setSelectedUsers(item as any)}
                  >
                    <Quickreply />
                    <h3 className="font-medium tracking-wide text-base">
                      Reply
                    </h3>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className=" hidden  lg:flex  flex-col sticky top-0 gap-1 w-full max-w-xs bg-white shadow-xl rounded-lg ">
            <h3 className="font-medium tracking-wide text-lg text-theme p-4 border-b ">
              Filter
            </h3>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">
                Show Newest
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">
                Show Oldest
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">
                Show Not Replied
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox size="small" />
              <h3 className="font-medium  tracking-wide text-sm">
                Show Replied
              </h3>
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(StudentFeedback);
