import Slider from "react-slick";

const Hero = () => {
  const sliderImages = [
    {
      id: 1,
      image: "/Features/login-3.png",
      title: "Integrated E-Learning System",
      subtitle:
        "Managed services to onboard content, integrated web conferencing tool to conduct online classes, assessments and automated evaluation, teacherand student/parent login, online course content to track student progress.",
    },
    {
      id: 2,
      image: "/Features/login-1.png",
      title: "Integrated E-Learning System",
      subtitle:
        "Managed services to onboard content, integrated web conferencing tool to conduct online classes, assessments and automated evaluation, teacherand student/parent login, online course content to track student progress.",
    },
    {
      id: 3,
      image: "/Features/login-3.png",
      title: "Integrated E-Learning System",
      subtitle:
        "Managed services to onboard content, integrated web conferencing tool to conduct online classes, assessments and automated evaluation, teacherand student/parent login, online course content to track student progress.",
    },
  ];
  const settings = {
    pauseOnHover: false,
    dots: true,
    arrows: false,
    autoplay: true,
    adaptiveHeight: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section id="home" className="w-full main-container py-10">
      <Slider {...settings}>
        {sliderImages.map((curElm) => (
          <div key={curElm?.id}>
            <div
              className="flex lg:flex-row flex-col gap-3 md:gap-0 items-center w-full justify-between"
              key={curElm?.id}
            >
              <div className="md:w-1/2 w-full flex flex-col md:gap-3 gap-2 order-2 lg:order-1">
                <p className="title-styling-secondary">{curElm?.title}</p>
                <p className=" tracking-tight">{curElm?.subtitle}</p>
                <div className="md:pt-4 pt-2">
                  <button className="btn-small">Login</button>
                </div>
              </div>
              <div className="md:w-1/2 w-full order-1 lg:order-2">
                <img src={curElm?.image} alt="" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
