import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  title?: string;
  author?: string;
  accessionNumber?: string;
  price?: number;
  bookIssue?: string | number;
  totalStock?: number | string;
  imageUrl?: string;
  _id?: string;
  mutate?: () => void;
  tags?: any;
  bookCategory?: string;
  publication?: string;
};

const LibraryBookCard = ({
  author,
  accessionNumber,
  price,
  bookIssue,
  title,
  totalStock,
  imageUrl,
  _id,
  tags,
  bookCategory,
  mutate,
  publication,
}: Props) => {
  const { push } = useRouter();
  const { mutate: designation } = useFetch();
  const handleDelete = async (id: any) => {
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
            const response = await designation({
              path: `book/delete/${id}`,
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
  // console.log(" Library successfully");
  return (
    <>
      <div className="bg-white group  flex rounded-xl gap-4 shadow-xl p-4 overflow-hidden scale-100 hover:scale-105 duration-300 transition-all ease-in-out cursor-pointer ">
        <div className="flex flex-col w-full items-center gap-1 justify-center">
          <div className="flex justify-center items-center">
            <Avatar
              sx={{
                height: "7rem",
                width: "7rem",
                borderRadius: "10px",
                objectFit: "contain",
              }}
              className="!object-contain "
              src={
                imageUrl
                  ? imageUrl
                  : "https://cdn-icons-png.flaticon.com/128/11894/11894549.png"
              }
            >
              {title?.[0]}
            </Avatar>
          </div>

          <div className="flex flex-col justify-center justify-items-center gap-[2px] items-center">
            <h2 className="tracking-wide font-semibold text-red-600">
              ₹{price}.00
            </h2>
            <h3 className="font-bold  text-gray-600 text-xl text-center uppercase">
              {title}
            </h3>

            <small className=" font-bold text-lg text-theme">
              Accession No - {accessionNumber}
            </small>
            <div className="flex flex-row gap-2">
              <small className=" font-medium text-gray-600">
                👩🏻‍🎓Total Issue - {bookIssue}
              </small>
              <small className=" font-medium text-gray-600">
                📚Total Stock - {totalStock}
              </small>
            </div>
            <small className=" font-medium text-gray-400">
              Author - {author}
            </small>
            <small className=" font-medium text-gray-400">
              Book Category - {bookCategory || "Not Provided"}
            </small>
            <small className=" font-medium text-gray-400 text-center">
              Publication - {publication || "Not Provided"}
            </small>
            {tags?.length > 0 ? (
              <small className=" font-medium text-gray-400 pt-2">
                Tags -{" "}
                {tags?.map((item: any, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 mx-2 my-2 bg-slate-500 text-white rounded-full font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </small>
            ) : null}
          </div>
        </div>

        <div className="absolute   top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
          <div className="w-fit flex h-full flex-col">
            <span
              className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
              onClick={() =>
                push(
                  `/panel/admin/library/add-new-book?edit=true&editId=${_id}`
                )
              }
            >
              <Tooltip title="Edit Book">
                <Edit />
              </Tooltip>
            </span>
            <span
              onClick={() => handleDelete(_id)}
              className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            >
              <Tooltip title="Delete Book">
                <Delete />
              </Tooltip>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryBookCard;
