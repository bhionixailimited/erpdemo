import { NoBookIcon } from "assets/static-icon";
import { Button } from "components/core";
import { useFetch } from "hooks";
import { notify } from "utils";

const StudentLibraryHistory = ({
  bookTitle,
  author,
  bookIssueDate,
  returnDate,
  daysPass,
  returned,
  img,
  payable,
  type,
  issueId,
  mutate,
}: any) => {
  const { mutate: material, loading } = useFetch();

  const handlePayFine = async (id: any) => {
    try {
      const response = await material({
        path: `library/update-issue-book/${id}`,
        method: "PUT",
        body: JSON.stringify({
          finePaid: payable,
        }),
      });
      if (response?.data?.error) throw new Error(response?.data?.error);
      mutate();

      notify.success(response?.data?.message);
    } catch (err) {
      if (err instanceof Error) {
        notify.error(err?.message);
      } else {
        notify.error("Oops! Something went wrong ");
      }
    }
  };
  const handleReturn = async (id: any) => {
    try {
      const response = await material({
        path: `library/return-issue-book/${id}`,
        method: "POST",
      });
      if (response?.data?.error) throw new Error(response?.data?.error);
      mutate();
      notify.success(response?.data?.message);
    } catch (err) {
      if (err instanceof Error) {
        notify.error(err?.message);
      } else {
        notify.error("Oops! Something went wrong ");
      }
    }
  };
  return (
    <div className="w-full border-b p-4 flex flex-col lg:flex-row justify-between gap-4 items-center ">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center">
          <img
            src={img || NoBookIcon.src}
            alt="Book Icon"
            className="h-20 w-20 !object-contain bg-gray-100 p-2 rounded-md shadow-lg "
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold tracking-wide text-xl">{bookTitle}</h3>
          <small className="tracking-wide font-medium text-gray-600">
            {author}
          </small>
          <small className="tracking-wide font-medium text-gray-600">
            Issue Date - {bookIssueDate}
          </small>
        </div>
      </div>
      <div className="flex items-center flex-col gap-1 justify-center">
        <h3 className="font-medium tracking-wide text-blue-500 text-sm">
          Return Date - {returnDate}
        </h3>
        <h3 className="font-medium tracking-wide text-red-500 text-sm">
          {daysPass ? `Due-date miss by ${daysPass} days` : null}
        </h3>
        <h3 className="font-medium tracking-wide text-red-500 text-sm">
          {payable ? `Payable Fine - ${payable}` : null}
        </h3>
      </div>
      {type !== "STUDENT" && (
        <div className="flex flex-col gap-4 items-center justify-center">
          {returned ? (
            <Button className="!bg-gray-500 hover:!ring-gray-500 !w-[7rem] !text-center ">
              Returned
            </Button>
          ) : (
            <>
              <Button
                loading={loading}
                className="!bg-green-500 hover:!ring-green-500 !w-[7rem] !text-center"
                onClick={() => handleReturn(issueId)}
              >
                Return
              </Button>
              <Button
                loading={loading}
                className="!bg-gray-500 hover:!ring-gray-500 !w-[7rem] !text-center "
                onClick={() => handlePayFine(issueId)}
              >
                Pay Fine
              </Button>
            </>
          )}
        </div>
      )}
      {type === "STUDENT" &&
        (returned ? (
          <Button className="!bg-gray-500 hover:!ring-gray-500 !w-[7rem] !text-center ">
            Returned
          </Button>
        ) : (
          <Button className="!bg-red-500 whitespace-nowrap hover:!ring-red-700 !min-w-[7rem] !text-center ">
            Not Returned
          </Button>
        ))}
    </div>
  );
};

export default StudentLibraryHistory;
