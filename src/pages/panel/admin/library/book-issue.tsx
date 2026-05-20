import {
  IssueNewBookIcon,
  ReturnBookIcon,
  StudentIcon,
} from "assets/static-icon";
import { BookIssueDetails, ReturnBook } from "components/admin";
import { IssueNewBookForm } from "components/form/admin";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { set } from "nprogress";
import { useState } from "react";
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
const IssueNewBook = () => {
  const { data } = useSWRFetch<dataType>("dashboard/admin/library-stat");
  const { push } = useRouter();

  const [bookIssue, setBookIssue] = useState(false);
  const [bookReturn, setBookReturn] = useState(false);

  const newBookData = [
    {
      key: "1",
      title: "Issue New Book",
      icon: IssueNewBookIcon.src,
      route: "",
      onclick: () => setBookIssue(true),
    },
    {
      key: "2",
      title: "Return Book",
      icon: ReturnBookIcon.src,
      route: "",
      onclick: () => setBookReturn(true),
    },
    {
      key: "3",
      title: "View Student Wise Book",
      icon: StudentIcon.src,
      route: "/panel/admin/library/student",
    },
  ];
  const [pageNo, setPageNo] = useState(1);
  const {
    data: issueBook,
    mutate,
    isValidating,
  } = useSWRFetch<any>(`library/all-issue?perPage=12&pageNo=${pageNo}`);

  return (
    <div className="w-full">
      <PrivateLayout title="Library | Book Issue">
        <section className="w-full p-4">
          {/* --------------------------IssueNewBookForm ----------------------------------------*/}
          <IssueNewBookForm
            mutate={mutate}
            open={bookIssue}
            closeFn={() => setBookIssue(false)}
          />

          {/* --------------------------Return book form ----------------------------------------*/}
          <ReturnBook open={bookReturn} closeFn={() => setBookReturn(false)} />

          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newBookData?.map((item) => (
              <div
                className="flex w-full scale-100 hover:scale-105 duration-300 ease-in-out transition-all cursor-pointer bg-white p-4 shadow-xl rounded-lg flex-col items-center "
                key={item?.key}
                onClick={() => {
                  item?.route && push(item?.route);
                  item?.onclick && item?.onclick();
                }}
              >
                <div className="flex w-fit items-center justify-center">
                  <img
                    src={item?.icon}
                    className="object-contain h-16 w-16"
                    alt={item?.title}
                  />
                </div>

                <h3 className="font-medium tracking-wide text-lg text-center">
                  {item?.title}
                </h3>
              </div>
            ))}

            <div className="flex w-full scale-100 hover:scale-105 duration-300 ease-in-out transition-all cursor-pointer gap-4 bg-white p-4 shadow-xl rounded-lg items-start ">
              <div className="flex w-fit bg-gray-100 rounded-md p-2 items-center justify-center">
                <img
                  src={ReturnBookIcon.src}
                  className="object-contain h-16 w-16"
                  alt="Return book"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-medium tracking-wide text-lg text-center">
                  Total Book Issued
                </h3>
                <h3 className="font-medium tracking-wide text-2xl text-center">
                  {data?.data?.totalBookIssued || 0}
                </h3>
              </div>
            </div>
          </div>

          <BookIssueDetails
            issueBook={issueBook}
            isValidating={isValidating}
            totalCount={issueBook?.totalCount}
            perPage={issueBook?.perPage}
            onChange={(e: any, v: number) => setPageNo(v)}
          />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(IssueNewBook);
