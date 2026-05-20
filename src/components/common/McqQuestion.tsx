import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

type Props = {
  assignmentDetails?: any;
};

const questionArray = [
  {
    _id: "1",
    question: "Which of the following is correct about JavaScript?",
    options: [
      "JavaScript is an Object-Based language",
      "JavaScript is Assembly-language",
      "JavaScript is an Object-Oriented language",
      "JavaScript is a High-level language",
    ],
    answer: "JavaScript is a High-level language",
    type: "mcq",
  },
  {
    _id: "2",
    question:
      "Arrays in JavaScript are defined by which of the following statements?",
    options: [
      "It is an ordered list of values",
      "It is an ordered list of objects",
      "It is an ordered list of string",
      "It is an ordered list of functions",
    ],
    answer: "It is an ordered list of values",
    type: "mcq",
  },
  {
    _id: "3",
    question:
      "Where is Client-side JavaScript code is embedded within HTML documents?",
    options: [
      "A URL that uses the special javascript:code",
      "A URL that uses the special javascript:protocol",
      "A URL that uses the special javascript:encoding",
      "A URL that uses the special javascript:stack",
    ],
    answer: "A URL that uses the special javascript:stack",
    type: "mcq",
  },
];

const McqQuestion = ({ assignmentDetails }: Props) => {
  const handleSubmit = () => {};

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
              <span className="text-theme font-semibold">
                {assignmentDetails?.totalMark}
              </span>
            </p>
          </div>
          {questionArray.map((item) => (
            <div key={item._id} className="flex flex-col gap-5">
              <p className="text-base font-semibold">
                {item._id}: {item.question}
              </p>
              {item?.type === "mcq" && (
                <div className="flex flex-col gap-4">
                  <FormControl>
                    <RadioGroup>
                      {item?.options?.map((option) => (
                        <FormControlLabel
                          value={option}
                          key={option}
                          control={
                            <Radio
                              sx={{
                                color: "#5B50A1",
                                "&.Mui-checked": {
                                  color: "#5B50A1",
                                },
                              }}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <span className="text-sm">
                    Answer -
                    <span className="text-green-500 font-semibold">
                      {item?.answer}{" "}
                    </span>
                  </span>
                </div>
              )}
              {item?.type === "long" && (
                <div>
                  <TextField
                    fullWidth
                    placeholder="Write your answer here....."
                    variant="outlined"
                    multiline
                    rows={5}
                  />
                </div>
              )}
            </div>
          ))}
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

export default McqQuestion;
