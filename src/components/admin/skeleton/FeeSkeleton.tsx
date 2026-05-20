import { Skeleton } from "@mui/lab";
  
  export default function FeeSkeleton({ i }: { i: number }) {
    return (
      <>
        {Array(i)
          .fill(0)
          .map((item, index) => (
            // <div key={index}>
              <div  className="w-full mt-1 grid grid-cols-12 p-4 gap-4" key={index} >
                {/* <div>
                  <Skeleton
                    variant="circular"
                    width={60}
                    height={60}
                    animation="pulse"
                  />
                </div> */}
                <div className="w-full col-span-12  shadow-md rounded-xl p-4">
                  <Skeleton variant="text" width={300} height={40} />
                  <Skeleton
                    variant="text"
                    width={250}
                    sx={{ fontSize: "1rem" }}
                  />
                </div>
              </div>
            // </div>
          ))}
      </>
    );
  }
  