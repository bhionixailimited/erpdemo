import { Grid } from "@mui/material";

const CompletedWork = () => {
  const Completed_Arr = [
    {
      id: 1,
      title: "93",
      des: "Happy Clients",
    },
    {
      id: 2,
      title: "76",
      des: "Projects",
    },
    {
      id: 3,
      title: "52",
      des: "Teams",
    },
    {
      id: 4,
      title: "6+",
      des: "Year Experience",
    },
  ];
  return (
    <section className="bg-[#FAF9FE] relative w-full">
      <div className="main-container py-6 md:py-10 flex flex-col gap-10">
        <h1 className="title-styling font-semibold text-center leading-7 md:leading-10">
          Over 1200+ <br />
          Completed Work & Still Counting.
        </h1>{" "}
        <div className="flex w-full items-center justify-center">
          <div
            className="md:flex hidden justify-between w-full h-44 my-10"
            id="wrapper"
          >
            {Completed_Arr?.map((item) => (
              <div
                key={item?.id}
                className={`${
                  item?.id % 2 !== 0 ? "items-start" : "items-end"
                } w-full flex justify-center h-full circle`}
              >
                <div
                  key={item?.id}
                  className="!z-[998] flex h-[7rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[7rem] flex-col rounded-full items-center justify-center"
                >
                  <p className="text-3xl font-semibold text-theme">
                    {item?.title}
                  </p>
                  <p className="text-[11px]">{item?.des}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex md:hidden flex-col w-full">
            <Grid container spacing={3}>
              {Completed_Arr?.map((item) => (
                <Grid item xs={6} key={item.id}>
                  <div
                    className={`h-40 w-full justify-center ${
                      item.id === 2 || item.id === 4
                        ? " items-end"
                        : " items-start"
                    } flex`}
                  >
                    <div
                      key={item.id}
                      className="w-28 bg-white h-28 rounded-full flex items-center justify-center flex-col shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    >
                      <p className="text-2xl font-semibold text-theme">
                        {item.title}
                      </p>
                      <p className="text-xs">{item.des}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-4">
        <img src="/Features/Polygon-1.png" alt="polygon" className="w-3" />
      </div>

      <div className="absolute left-10 top-24">
        <img src="/Features/Ellipse-1.png" alt="polygon" className="w-2" />
      </div>
      <div className="absolute top-40 right-10">
        <img src="/Features/Polygon-1.png" alt="polygon" className="w-3" />
      </div>
    </section>
  );
};

export default CompletedWork;
