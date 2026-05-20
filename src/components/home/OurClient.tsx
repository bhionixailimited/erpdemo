import { Grid } from "@mui/material";

const OurClient = () => {
  const Client_Arr = [
    {
      id: 1,
      image: "/Partners/Picture1.png",
    },
    {
      id: 2,
      image: "/Partners/Picture2.png",
    },
    {
      id: 3,
      image: "/Partners/Picture3.png",
    },
    {
      id: 4,
      image: "/Partners/Picture4.png",
    },
    {
      id: 5,
      image: "/Partners/Picture5.png",
    },
    {
      id: 6,
      image: "/Partners/Picture6.png",
    },
    {
      id: 7,
      image: "/Partners/Picture7.png",
    },
    {
      id: 8,
      image: "/Partners/Picture8.png",
    },
    {
      id: 9,
      image: "/Partners/Picture9.png",
    },
    {
      id: 10,
      image: "/Partners/Picture10.png",
    },
    {
      id: 11,
      image: "/Partners/Picture11.png",
    },
    {
      id: 12,
      image: "/Partners/Picture12.png",
    },
    {
      id: 13,
      image: "/Partners/Picture13.png",
    },
    {
      id: 14,
      image: "/Partners/Picture14.png",
    },
    {
      id: 15,
      image: "/Partners/Picture15.png",
    },
    {
      id: 16,
      image: "/Partners/Picture16.png",
    },
    {
      id: 17,
      image: "/Partners/Picture17.jpg",
    },
    {
      id: 18,
      image: "/Partners/Picture18.jpg",
    },
    {
      id: 19,
      image: "/Partners/Picture19.png",
    },
    {
      id: 20,
      image: "/Partners/Picture20.jpg",
    },
    {
      id: 21,
      image: "/Partners/Picture21.png",
    },
    {
      id: 22,
      image: "/Partners/Picture22.jpg",
    },
    {
      id: 23,
      image: "/Partners/Picture23.png",
    },
    {
      id: 24,
      image: "/Partners/Picture24.jpg",
    },
    {
      id: 25,
      image: "/Partners/Picture25.jpg",
    },
    {
      id: 26,
      image: "/Partners/Picture26.png",
    },
    {
      id: 27,
      image: "/Partners/Picture27.png",
    },
    {
      id: 28,
      image: "/Partners/Picture28.jpg",
    },
    {
      id: 29,
      image: "/Partners/Picture29.png",
    },
    {
      id: 30,
      image: "/Partners/Picture30.png",
    },
    {
      id: 31,
      image: "/Partners/Picture31.png",
    },
    {
      id: 32,
      image: "/Partners/Picture32.png",
    },
  ];
  return (
    <section>
      <div className="main-container pt-10 pb-6 md:py-16 w-full flex flex-col justify-center gap-7 md:gap-10 items-center">
        <h1 className="title-styling text-center">Our Clients</h1>
        <div className="md:pt-10 flex items-center justify-center w-full px-5">
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {Client_Arr?.map((item) => (
              <Grid item key={item?.id} xs={6} sm={4} md={3} lg={2}>
                <div
                  className={` ${
                    item.id === 11
                      ? "hidden md:flex md:h-36 md:items-center md:justify-center"
                      : "flex items-center justify-center h-36"
                  }`}
                >
                  <img
                    src={item?.image}
                    alt="partner_images"
                    className="w-24"
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default OurClient;
