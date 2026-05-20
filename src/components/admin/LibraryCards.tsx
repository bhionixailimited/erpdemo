import {
  BooksIcon,
  LibraryIcon,
  MoneyIcon,
  WriterIcon,
} from "assets/static-icon";
import { LibraryCard } from "components/cards";
import { useSWRFetch } from "hooks";
import { MoneyFormat } from "utils";
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
const LibraryCards = () => {
  const { data } = useSWRFetch<dataType>("dashboard/admin/library-stat");

  const cardData = [
    {
      key: "1",
      title: "Total Books",
      value: data?.data?.totalBook || 0,
      icon: BooksIcon.src,
      background:
        " linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    },
    {
      key: "2",
      title: "Total Authors",
      value: data?.data?.totalAuthors || 0,
      icon: WriterIcon.src,
      background:
        " linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    },
    {
      key: "3",
      title: "Total Book Issued",
      value: data?.data?.totalBookIssued || 0,
      icon: LibraryIcon.src,
      background:
        " linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    },
    {
      key: "4",
      title: "Total Fine Collected",
      value: MoneyFormat(data?.data?.totalFineCollected || 0),
      icon: MoneyIcon.src,
      background:
        " linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {cardData?.map((item) => (
        <LibraryCard
          key={item?.key}
          value={item?.value}
          icon={item?.icon}
          title={item?.title}
          bg={item?.background}
        />
      ))}
    </div>
  );
};

export default LibraryCards;
