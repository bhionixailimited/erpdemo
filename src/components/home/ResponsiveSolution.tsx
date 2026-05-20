import { Check, ExpandMore, KeyboardArrowRight } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { SolutionBg } from "assets/backgrounds";
import { useState } from "react";
import { Solution_Arr } from "./Solutions";

interface Props {
  setActiveData?: any;
  activeData?: any;
}
const ResponsiveSolution = () => {
  const [activeId, setActiveId] = useState("2");

  const handleActive = (ID: string) => {
    if (activeId.includes(ID)) {
      setActiveId("");
      return;
    }
    setActiveId(ID);
  };
  return (
    <div className="flex justify-between flex-col w-full h-fit">
      <div className="w-full flex justify-between h-full flex-col">
        {Solution_Arr?.map((item) => (
          <div key={item?.id} className="flex flex-col">
            <Accordion
              expanded={activeId === item?.id}
              sx={{
                boxShadow: "none !important",
                background: "",
              }}
            >
              <AccordionSummary>
                <span
                  onClick={() => handleActive(item?.id)}
                  className={`${
                    activeId === item?.id
                      ? " border-l-8 border-theme shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-black"
                      : "bg-white border border-theme"
                  }  flex  w-full h-20 rounded-lg cursor-pointer text-sm items-center justify-between px-5 text-clip font-semibold hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] common-transition shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
                >
                  <p>{item?.title}</p>
                  {activeId === item.id ? (
                    <p>
                      <ExpandMore className="text-sm" />
                    </p>
                  ) : (
                    <p>
                      <KeyboardArrowRight className="text-sm" />
                    </p>
                  )}
                </span>
              </AccordionSummary>
              <AccordionDetails>
                <div className="mt-3 rounded-[12px] w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                  <div
                    style={{
                      backgroundImage: `url('${SolutionBg.src}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      height: "100%",
                      width: "100%",
                      borderRadius: "12px",
                    }}
                  >
                    <div className="flex w-full gap-5 p-7 flex-col h-full">
                      {item &&
                        item?.description
                          ?.slice(0, 10)
                          .map((innerItem: any) => (
                            <div
                              key={innerItem?.id}
                              className="flex gap-2 items-center "
                            >
                              <div className="w-fit">
                                <span className="border-dotted border border-white h-6 w-6 flex items-center justify-center rounded-full">
                                  <p className="w-4 h-4 rounded-full flex items-center justify-center bg-white">
                                    <Check className="!text-theme !text-base" />
                                  </p>
                                </span>
                              </div>
                              <p className="font-semibold text-white text-sm ">
                                {innerItem?.solution}
                              </p>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveSolution;
