import { Add, CloudUpload, FileUpload } from "@mui/icons-material";
import { BooksIcon, StudentIcon } from "assets/static-icon";
import { LibraryStat } from "components/cards";
import { useSWRFetch } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
type dataType = {
  data: {
    _id: number;
    totalBook: number;
    totalAuthors: number;
    totalBookIssued: number;
    totalFineCollected: number;
    totalPublications: number;
    totalStudents: number;
  };
};
const LibraryBody = () => {
  const { data } = useSWRFetch<dataType>("dashboard/admin/library-stat");
  let statData = [
    {
      key: "1",
      title: "Total Student",
      value: data?.data?.totalStudents || 0,
      icon: StudentIcon.src,
    },
  ];

  const { push } = useRouter();

  return (
    <div className="w-full flex py-4 gap-4">
      <div className="w-full flex flex-col lg:flex-row gap-4 ">
        <Link href={`/panel/admin/library/add-new-book`}>
          <div className="w-full bg-white flex-col justify-center p-4 flex items-center shadow-xl select-none rounded-lg gap-4 hover:scale-95 scale-100 duration-300 ease-in-out cursor-pointer  ">
            <Add className="text-6xl text-theme " />

            <h3 className="font-medium tracking-wide text-2xl text-theme">
              Add New Book
            </h3>
          </div>
        </Link>
        <div
          className="w-full bg-white flex-col p-4 flex items-center justify-center shadow-xl  select-none hover:scale-95 scale-100 duration-300 ease-in-out cursor-pointer rounded-lg gap-4  "
          onClick={() => push(`/panel/admin/library/bulk-upload`)}
        >
          <CloudUpload className="text-6xl text-theme " />

          <h3 className="font-medium tracking-wide text-2xl text-theme">
            Bulk Upload Book
          </h3>
        </div>
        <div
          className="w-full bg-white flex-col p-4 flex items-center justify-center shadow-xl  select-none hover:scale-95 scale-100 duration-300 ease-in-out cursor-pointer rounded-lg gap-4  "
          onClick={() => push(`/panel/admin/library/update-stock`)}
        >
          <FileUpload className="text-6xl text-theme " />

          <h3 className="font-medium tracking-wide text-2xl text-theme">
            Update Book Stock
          </h3>
        </div>
        <div className="grid grid-cols-1 w-full gap-4 ">
          {statData?.map((statData) => (
            <LibraryStat
              key={statData?.key}
              title={statData?.title}
              icon={statData?.icon}
              value={statData?.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryBody;
