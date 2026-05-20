import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 400,
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 940,
      settings: {
        autoplay: false,
        autoplaySpeed: 3000,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ],
};

export const Review_Arr = [
  {
    id: 1,
    photoUrl: "/Partners/Justin.png",
    displayName: "Abbas Chohan: Principle, Edgewood School",
    description:
      "Our school's success as a whole has been significantly enhanced by YardERP. The cutting-edge technology has improved instruction and learning and aided in student achievement.",
  },
];
const ReviewBox = ({
  activeNumber,
  reference,
}: {
  activeNumber: number;
  reference: any;
}) => {
  return (
    <div className="w-full">
      <section className="testimonial-slick company-slick-slider overflow-hidden w-full md:pr-20">
        <Slider ref={reference} {...settings} className="our-store-dots">
          {Review_Arr?.map((item) => (
            <div
              className="p-5 client-box justify-between rounded-lg gap-3 flex flex-col h-44"
              key={item?.id}
            >
              <div className="md:leading-5 leading-4 md:text-sm text-xs text-white border-b border-[#8478CD] pb-6">
                {item.description}
              </div>
              <div className="flex justify-between items-center ">
                <div className="w-2/3 flex gap-2 items-center">
                  <div className="w-12">
                    <img src={item.photoUrl} alt="" className="w-12" />
                  </div>
                  <div>
                    <p className="md:text-sm text-xs font-semibold text-white">
                      {item.displayName}
                    </p>
                    {/* <p className="text-[10px] text-white">{item.designation}</p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* <div className="flex md:hidden px-4">
        {Review_Arr?.map((item) => (
          <div key={item.id}>
            {item.id === activeNumber && (
              <div
                className="p-5 relative w-full client-box rounded-lg gap-3 md:flex flex-col"
                key={item?.id}
              >
                <p className="md:leading-5 leading-4 md:text-sm text-xs text-white border-b border-[#8478CD] pb-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="w-2/3 flex gap-2 items-center">
                    <div className="w-12">
                      <img src={item.photoUrl} alt="" className="w-12" />
                    </div>
                    <div>
                      <p className="md:text-sm text-xs font-semibold text-white">
                        {item.displayName}
                      </p>
                      <p className="text-[10px] text-white">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ReviewBox;
