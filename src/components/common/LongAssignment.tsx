import { Divider } from "@mui/material";
import { ImageIcon, PdfIcon } from "assets/static-icon";
import { InputField } from "components/core";

type Props = {
  assignmentDetails?: any;
};

const questionArray = [
  {
    _id: "1",
    question: "Which of the following is correct about JavaScript?",
    answer: "JavaScript is a High-level language",
    type: "mcq",
    attachment: [
      {
        _id: "1",
        type: "PDF",
        url: "http//dvfvdfvf/dv/dv/f/v/d/vd/v/vvfdvfvfd.co",
      },
      {
        _id: "2",
        type: "IMAGE",
        url: "http//dvfvdfvf/dv/dv/f/v/d/vd/v/vvfdvfvfd.co",
      },
    ],
  },
  {
    _id: "2",
    question:
      "Arrays in JavaScript are defined by which of the following statements?",
    answer:
      "It is an ordered list of values Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error.",
    type: "mcq",
  },
  {
    _id: "3",
    question:
      "Where is Client-side JavaScript code is embedded within HTML documents?",
    answer:
      "A URL that uses the special javascript:stack Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deserunt, alias voluptatem excepturi quae aliquid culpa placeat eius. Sunt aspernatur iste rerum ipsam exercitationem error. ",
    type: "mcq",
  },
];

const LongAssignment = ({ assignmentDetails }: Props) => {
  const handleSubmit = () => {
  
  };

  return (
    <section className="flex w-full flex-col gap-1  items-center justify-center">
      <div className="flex w-full px-5 flex-col gap-2  items-center justify-center ">
        <div className="w-full relative flex flex-col gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-5 border-t-8 border-theme rounded-xl">
          <h1 className="text-center w-full font-semibold text-2xl">
            {assignmentDetails?.chapter}
          </h1>
          <p className="text-center w-full font-semibold text-xl text-theme border-b pb-2 border-theme">
            {assignmentDetails?.assignmentName}
          </p>
          <div className="absolute right-5 top-10 flex flex-col gap-1">
            <p className="text-sm">
              Due Date:{" "}
              <span className="text-themeSecondary font-semibold">
                {assignmentDetails?.lastDate}{" "}
              </span>
            </p>
            <p className="text-sm ">
              Total Points:{" "}
              <span className="text-theme font-semibold">100</span>
            </p>
          </div>

          {questionArray.map((item) => (
            <div key={item._id} className="flex flex-col gap-5">
              <p className="text-base font-semibold">
                {item._id}: {item.question}
              </p>

              <div className="w-full">
                <p className="w-full">Ans : {item?.answer}</p>
              </div>

              {item?.attachment && item?.attachment?.length && (
                <div className="flex flex-col  items-start gap-2">
                  <h3 className="font-medium tracking-wide">Attachment - </h3>
                  <div className="flex items-center flex-wrap gap-4 ">
                    {item?.attachment?.map((attachment) => (
                      <a
                        href={attachment?.url}
                        target={"_blank"}
                        key={attachment?._id}
                        rel="noopener noreferrer"
                      >
                        <div className="h-20 w-20 p-4 bg-theme shadow-lg rounded-lg group ">
                          {attachment?.type === "PDF" ? (
                            <img
                              src={PdfIcon.src}
                              alt="icon"
                              className="h-full w-full object-contain shadow-xl scale-100  group-hover:scale-110  transition-all ease-in-out duration-300 "
                            />
                          ) : (
                            <img
                              src={ImageIcon.src}
                              alt="icon"
                              className="h-full w-full object-contain shadow-xl  scale-100  group-hover:scale-110  transition-all ease-in-out duration-300 "
                            />
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col w-fit items-start gap-2">
                <h3 className="font-medium tracking-wide">Mark for answer -</h3>
                <InputField className="!h-10 " type="number" />
              </div>
            </div>
          ))}
          <Divider />

          <div className="flex flex-col w-fit items-start gap-2">
            <h3 className="font-medium tracking-wide">Total Mark</h3>
            <InputField className="!h-10 " type="number" />
          </div>
          <div className="w-full">
            <InputField
              type="text"
              multiline
              rows={5}
              className="w-full"
              label={"Remark"}
            />
          </div>

          <div className="w-full flex items-center">
            <button onClick={handleSubmit} className="btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongAssignment;
