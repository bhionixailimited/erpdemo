import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const fees_structure_arr = [
  {
    id: 1,
    type: "Admission Fee",
    amount: "250000",
  },
  {
    id: 2,
    type: "Grade Card",
    amount: "30000",
  },
  {
    id: 3,
    type: "Provisional Certificate",
    amount: "20000",
  },
  {
    id: 4,
    type: "Tuition Fee",
    amount: "40000",
  },
  {
    id: 5,
    type: "Grade Card",
    amount: "30000",
  },
  {
    id: 6,
    type: "Examination Fee",
    amount: "30000",
  },
  {
    id: 7,
    type: "Grade Card",
    amount: "30000",
  },
  {
    id: 8,
    type: "Registration Fee",
    amount: "40000",
  },
  {
    id: 9,
    type: "Institution Security Fee",
    amount: "20000",
  },
  {
    id: 10,
    type: "Library Security Fee",
    amount: "15000",
  },
  {
    id: 11,
    type: "Total",
    amount: "4900000",
  },
];
const FeesStructure = () => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-10 px-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 rounded-xl">
      <h1 className="text-xl font-semibold tracking-wide">Fees Structure</h1>
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
                            : "font-normal"
                        }`}
                      >
                        {item.type}
                      </p>
                    </TableCell>
                    <TableCell align="right">
                      <p
                        className={`${
                          item.type === "Total"
                            ? "font-semibold text-lg"
                            : "font-normal"
                        }`}
                      >
                        ₹{item.amount}
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeesStructure;
