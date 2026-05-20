import {
  WhyUsSeven,
  WhyUsFive,
  WhyUsFour,
  WhyUsOne,
  WhyUsSix,
  WhyUsThree,
  WhyUsTwo,
  WhyUsLastBg,
} from "assets/backgrounds";
import { Grid } from "@mui/material";
const WhyUs = () => {
  const WhyUs_Arr = [
    {
      id: 1,
      img: WhyUsOne.src,
    },
    {
      id: 2,
      img: WhyUsTwo.src,
    },
    {
      id: 3,
      img: WhyUsThree.src,
    },
    {
      id: 4,
      img: WhyUsFour.src,
    },
    {
      id: 5,
      img: WhyUsFive.src,
    },
    {
      id: 6,
      img: WhyUsSix.src,
    },
    {
      id: 7,
      img: WhyUsSeven.src,
    },
  ];
  return (
    <section className="bg-[#FAF9FE]">
      <div className="main-container py-6 md:py-10 relative flex gap-3 flex-col justify-center items-center">
        <h1 className="title-styling text-center">Why Us?</h1>
        <p className="text-center md:text-sm text-xs  md:leading-6 md:px-16 md:tracking-tight">
          Today all the leading schools, colleges, and universities are using
          College Management Software to handle all the administrative, and
          academic processes digitally. Keeping these insights in mind, YardErp
          offers education ERP solutions that assure management of all academic
          and non-academic performances while optimizing resource utilization
          and ensuring clarity over all departments.
        </p>
        <div className="w-full justify-center items-center flex pt-6 md:pt-10">
          <div className="md:w-9/12 w-full 2xl:w-4/6  flex items-center justify-center">
            <Grid container style={{ justifyContent: "center" }}>
              {WhyUs_Arr.map((item) => (
                <Grid key={item.id} sm={2.8} md={2.8} lg={2.8} item>
                  <img
                    src={item.img}
                    alt="why us image"
                    className="md:h-48 h-20 w-20 md:w-48"
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className="absolute top-1/2 left-20">
          <img src="/Features/Polygon-1.png" alt="polygon" className="w-3" />
        </div>
        <div className="absolute right-40 top-2/5">
          <img src="/Features/Ellipse-1.png" alt="polygon" className="w-2" />
        </div>
      </div>
      <div>
        <img src={WhyUsLastBg.src} className="w-full" alt="" />
      </div>
    </section>
  );
};

export default WhyUs;
