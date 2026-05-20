import {
  AssignmentTurnedIn,
  Badge,
  Delete,
  Edit,
  Visibility,
} from "@mui/icons-material";
import { Skeleton } from "@mui/lab";
import { Avatar, Tooltip } from "@mui/material";

export default function AllFinanceCard({ i }: { i: number }) {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div key={index}>
            <div className="flex gap-4 mb-2 px-4">
              <div>
                <Skeleton
                  variant="circular"
                  width={60}
                  height={60}
                  animation="pulse"
                />
              </div>
              <div>
                <Skeleton variant="text" width={300} height={40} />
                <Skeleton
                  variant="text"
                  width={250}
                  sx={{ fontSize: "1rem" }}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
