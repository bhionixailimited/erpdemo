import { Grid } from "@mui/material";

const Features = () => {
  const Feature_Arr = [
    {
      _id: "1",
      title: "Student Information",
    },
    {
      _id: "2",
      title: "Admissions",
    },
    {
      _id: "3",
      title: "Fee Collection",
    },
    {
      _id: "4",
      title: "Communication",
    },
    {
      _id: "5",
      title: "Gradebook",
    },
    {
      _id: "6",
      title: "HR & Payroll",
    },
    {
      _id: "7",
      title: "Transport Management",
    },
    {
      _id: "8",
      title: "Dynamic Forms",
    },
    {
      _id: "9",
      title: "Parent Concerns",
    },
    {
      _id: "10",
      title: "Library Management",
    },
    {
      _id: "11",
      title: "Inventory Management",
    },
  ];
  return (
    <section className="bg-gray-100/50">
      <div className="main-container py-5 md:py-10 flex items-center justify-center flex-col">
        <div className="flex flex-col items-center justify-center text-center w-3/4 gap-3">
          <h1 className="text-theme title-styling">
            {/* A Market Leader in end-to-end Unified Education Management Solutions */}
            Modules
          </h1>
          <p>
            Supporting over 2900+ schools, with 1,00,000+ staff, 17,000,000+
            students in the 200+ cities
          </p>
        </div>
        <div className="flex items-center justify-center pt-8">
          <Grid
            container
            spacing={{ xs: 2, sm: 2, md: 2, lg: 3 }}
            style={{ justifyContent: "center" }}
          >
            {Feature_Arr?.map((item) => (
              <Grid item xs={6} sm={6} md={6} lg={3} key={item?._id}>
                <div className="flex flex-col items-center md:h-72 h-60 border-t-4 cursor-pointer common-transition border bg-white hover:bg-theme border-gray-300 border-t-theme p-2 gap-2 md:gap-5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] Card-Hover group relative">
                  <div className="h-1/2 flex justify-end items-end z-10">
                    <div className="bg-gradient-to-br group-hover:bg-white from-yellow-500 to-themeSecondary rounded-full overflow-hidden">
                      <img
                        src="/Features/graduated.png"
                        alt="feature"
                        className="md:w-24 w-20 p-4"
                      />
                    </div>
                  </div>
                  <div className="h-1/2 flex flex-col gap-0.5 z-10">
                    <p className="md:text-lg text-base font-semibold text-center group-hover:text-white common-transition">
                      {item?.title}
                    </p>
                    <p className="text-center md:text-base text-sm leading-2 group-hover:text-white common-transition">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default Features;
