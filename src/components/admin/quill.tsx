import dynamic from "next/dynamic";
import { formats, modules } from "./EditorToolbar";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Quill({ value, onChange }: any) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        // value={state.en}
        // onChange={(e) => {
        //   setState({
        //     ...state,
        //     en: e,
        //   });
        // }}
        onChange={onChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
