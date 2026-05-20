import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

interface Props {
  activeQuestion?: {
    id: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    options?: any;
    answer?: string;
    image?: any;
  };
  key?: number;
  examId?: any;
}

const McqQuestion = ({ activeQuestion, key, examId }: Props) => {
  return (
    <div className="w-full">
      {examId === "1" && (
        <div key={activeQuestion?.id} className="flex flex-col w-full">
          <p className="text-base font-semibold">{activeQuestion?.id}</p>
          {activeQuestion?.image && (
            <div className="flex items-start gap-4 w-full ">
              <div className="w-full h-full">
                <img
                  src={
                    activeQuestion?.image &&
                    typeof activeQuestion?.image === "string"
                      ? activeQuestion?.image
                      : URL.createObjectURL(activeQuestion?.image)
                  }
                  alt="Question"
                  className="h-full w-full object-contain border-2 "
                />
              </div>
            </div>
          )}

          <p className="text-base font-semibold">{activeQuestion?.question}</p>

          {activeQuestion?.options ? (
            <FormControl defaultValue={activeQuestion?.answer}>
              <RadioGroup defaultValue={activeQuestion?.answer}>
                {activeQuestion?.options?.map((item: any, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={item}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#5B50A1",
                          "&.Mui-checked": {
                            color: "#5B50A1",
                          },
                        }}
                      />
                    }
                    label={<p className="text-sm ">{item}</p>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <div className="">
              <FormControl defaultValue={activeQuestion?.answer}>
                <RadioGroup defaultValue={activeQuestion?.answer}>
                  <FormControlLabel
                    value={activeQuestion?.option1}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#5B50A1",
                          "&.Mui-checked": {
                            color: "#5B50A1",
                          },
                        }}
                      />
                    }
                    label={
                      <p className="text-sm ">{activeQuestion?.option1}</p>
                    }
                  />
                  <FormControlLabel
                    value={activeQuestion?.option2}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#5B50A1",
                          "&.Mui-checked": {
                            color: "#5B50A1",
                          },
                        }}
                      />
                    }
                    label={
                      <p className="text-sm ">{activeQuestion?.option2}</p>
                    }
                  />
                  <FormControlLabel
                    value={activeQuestion?.option3}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#5B50A1",
                          "&.Mui-checked": {
                            color: "#5B50A1",
                          },
                        }}
                      />
                    }
                    label={
                      <p className="text-sm ">{activeQuestion?.option3}</p>
                    }
                  />{" "}
                  <FormControlLabel
                    value={activeQuestion?.option4}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#5B50A1",
                          "&.Mui-checked": {
                            color: "#5B50A1",
                          },
                        }}
                      />
                    }
                    label={
                      <p className="text-sm ">{activeQuestion?.option4}</p>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
          )}
        </div>
      )}
      {examId === "2" && (
        <div className="flex w-full flex-col gap-3">
          {activeQuestion?.image ? (
            <div className="flex items-start gap-4 w-full ">
              <p className="text-base font-semibold">{activeQuestion?.id}:</p>
              <div className="w-full h-full">
                <img
                  src={
                    activeQuestion?.image &&
                    typeof activeQuestion?.image === "string"
                      ? activeQuestion?.image
                      : URL.createObjectURL(activeQuestion?.image)
                  }
                  alt="Question"
                  className="h-full w-full object-contain border-2 "
                />
              </div>
            </div>
          ) : (
            <p className="text-base font-semibold">
              {activeQuestion?.id}: {activeQuestion?.question}
            </p>
          )}

          <div>
            <TextField
              fullWidth
              placeholder="Write your answer here....."
              variant="outlined"
              multiline
              rows={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default McqQuestion;
