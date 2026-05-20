import { StaffTransactions } from "./studentdetails";

const fees_structure_arr = [
  {
    id: 1,
    type: "January",
    amount: "25000",
  },
  {
    id: 2,
    type: "February",
    amount: "30000",
  },
  {
    id: 3,
    type: "March",
    amount: "30000",
  },
  {
    id: 4,
    type: "April",
    amount: "30000",
  },
  {
    id: 5,
    type: "May",
    amount: "30000",
  },
  {
    id: 6,
    type: "June",
    amount: "30000",
  },
  {
    id: 7,
    type: "July",
    amount: "30000",
  },
  {
    id: 8,
    type: "August",
    amount: "40000",
  },
  {
    id: 9,
    type: "September",
    amount: "40000",
  },
  {
    id: 10,
    type: "October",
    amount: "40000",
  },
  {
    id: 11,
    type: "November",
    amount: "45000",
  },
  {
    id: 12,
    type: "December",
    amount: "45000",
  },
];

const StaffPaymentDetails = ({ staffId }: { staffId?: string }) => {
  return (
    <div>
      <div className="w-full md:p-4  rounded-md">
        <div className="w-full">
          <div className="flex  md:flex-row flex-col gap-3 mt-1 ">
            <div className="md:w-8/12 w-full bg-blue-100 rounded p-3 border border-blue-500">
              <StaffTransactions staffId={staffId} />
            </div>
            {/* <div className="md:w-1/2 w-full bg-blue-100 rounded p-3 border border-blue-500">
              <div className="w-full flex flex-col items-start justify-center gap-10 px-5  py-5 rounded-xl">
                <h1 className="text-3xl text-theme font-semibold tracking-wide">
                  Pending Fees
                </h1>
                <div className="w-full flex flex-col gap-2">
                  {fees_structure_arr.map((item) => (
                    <div key={item.id} className="flex w-full justify-between">
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                <p
                                  className={`${
                                    item.type === "Total"
                                      ? "font-semibold text-lg"
                                      : "font-semibold text-theme whitespace-nowrap"
                                  }`}
                                >
                                  {item.type}
                                </p>
                              </TableCell>
                              <TableCell align="right" className="!w-full ">
                                <p
                                  className={`${
                                    item.type === "Total"
                                      ? "font-semibold text-lg"
                                      : "font-normal text-themeSecondary mr-7"
                                  }`}
                                >
                                  ₹{item.amount}
                                </p>
                              </TableCell>
                              <TableCell align="right" className="!w-full">
                                <span className="bg-theme whitespace-nowrap text-white px-2 py-2 rounded-md shadow-md">
                                  Credited <Check />
                                </span>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPaymentDetails;
