import { useExamData } from "hooks";
import { useEffect, useState } from "react";
import ExamType from "types/exam";
import Swal from "sweetalert2";
import { notify } from "utils";

type ExamDataType = {
  data: ExamType;
};

declare global {
  interface Document {
    webkitIsFullScreen: any;
    mozFullScreen: any;
    msFullscreenElement: any;
  }
}

const useSafeExam = (isSubmitted: boolean) => {
  const {
    exam,
    maxViolation,
    handleViolation,
    setExamDuration,
    examEndTime,
    examDuration,
    handleExamSubmit,
  } = useExamData();

  //disable right click context menu
  const contextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

  //handle user blur event that detect user on another screen
  const handleBlur = (count: number) => {
    Swal.fire({
      title: "Not Allowed",
      text:
        count === 1
          ? `You have no more warning left, any breach in exam protocol leads to auto submit the exam `
          : `Open another tab or window or different program is prohibited. You have ${count} more warning left otherwise the exam will be automatically submitted.`,
      icon: "warning",
    }).then(() => {
      handleViolation();
    });
  };

  //handle disable autocomplete
  const handleDisableAutocomplete = () => {
    let inputElements = document.getElementsByTagName("input");

    let textAreaElement = document.getElementsByTagName("textarea");

    for (let i = 0; i < inputElements.length; i++) {
      inputElements[i].setAttribute("autocomplete", "new-password");
    }
    for (let i = 0; i < textAreaElement.length; i++) {
      textAreaElement[i].setAttribute("autocomplete", "new-password");
    }
  };

  //disable google translate
  const handleDisableTranslate = () => {
    const htmlTag = document.getElementsByTagName("head")[0];
    let metaTag = document.createElement("meta");
    htmlTag.appendChild(metaTag);
  };

  //disable printing
  const handleDisablePrinting = () => {
    const htmlTag = document.getElementsByTagName("head")[0];
    let styleTag = document.createElement("style");

    styleTag.innerHTML = `
    @media print {
      body {
        display: none;
      }
    }

    `;
    htmlTag.appendChild(styleTag);
  };

  //disable copy and paste
  const handleDisableCopyPaste = () => {
    //when we use this react quill auto focus becomes problematic
    // document.addEventListener("selectstart", (e) => {
    //   e?.preventDefault();
    //   return false;
    // });
    document.body.oncut = (e) => {
      e.preventDefault();
      return false;
    };
    document.body.oncopy = (e) => {
      e.preventDefault();
      return false;
    };
    document.body.onpaste = (e) => {
      e.preventDefault();
      return false;
    };
  };

  //handle disable spellcheck
  const handleDisableSpellCheck = () => {
    let textAreaElement = document.getElementsByTagName("textarea");
    for (let i = 0; i < textAreaElement.length; i++) {
      textAreaElement[i].setAttribute("spellcheck", "false");
    }
  };

  //handle full screen change event

  const handleFullScreenChange = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      try {
        Swal.fire({
          title: "Not Allowed",
          text: "User must remail full screen on all the time while in the exam. Press ok to change to full screen mode again or your exam will be submitted automatically",
          icon: "error",
          timer: 100000,
          confirmButtonText: "Switch to Fullscreen",
          cancelButtonText: "Cancel & Submit",
          showCancelButton: true,
          showConfirmButton: true,
          allowOutsideClick: false,
        }).then((value) => {
          if (value?.value) {
            document.documentElement.requestFullscreen();
          } else {
            handleExamSubmit();
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error?.message);
        } else {
          notify.error("Oops! Something went wrong.");
        }
      }
    }
  };

  //handle before unload event
  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    handleExamSubmit();
    return false;
  };

  //exam restriction
  useEffect(() => {
    if (isSubmitted) return;
    //if autocomplete is off add autocomplete off in all the input and text area
    if (exam?.disableAutocomplete) handleDisableAutocomplete();
    //disable google translate in a page
    if (exam?.disableDisplayTranslate) handleDisableTranslate();
    //disable printing website
    if (exam?.disablePrinting) handleDisablePrinting();
    //disable copy/paste
    if (exam?.disableCopyPaste) handleDisableCopyPaste();
    //disable spellcheck
    if (exam?.disableSpellCheck) handleDisableSpellCheck();
  }, [exam, isSubmitted]);

  //default restriction
  useEffect(() => {
    if (isSubmitted) return;
    window.addEventListener("contextmenu", contextMenu);
    window.addEventListener("blur", () => handleBlur(maxViolation));
    document.addEventListener("fullscreenchange", () =>
      handleFullScreenChange()
    );
    window.onbeforeunload = handleBeforeUnload;
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullScreenChange,
      false
    );
    document.addEventListener(
      "mozfullscreenchange",
      handleFullScreenChange,
      false
    );
    return () => {
      window.removeEventListener("contextmenu", contextMenu);
    };
  }, [maxViolation, isSubmitted]);

  //realtime data
  useEffect(() => {
    if (!examEndTime || isSubmitted) return;
    let durationTimeout = setTimeout(() => {
      let now = Date.now();
      let endTime = new Date(examEndTime as any).getTime();
      if (endTime > now) {
        setExamDuration(endTime - now);
      } else {
        handleExamSubmit();
      }
    }, 1000);

    return () => {
      clearTimeout(durationTimeout);
    };
  }, [examDuration, examEndTime, isSubmitted]);
};

export default useSafeExam;
