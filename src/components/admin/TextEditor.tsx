import dynamic from "next/dynamic";
const Quill = dynamic(() => import("./quill"), { ssr: false });
const EditorToolbar = dynamic(() => import("./EditorToolbar"), { ssr: false });
export default function TextEditor({ value, onChange }: any) {
  return (
    <div className="text-editor">
      <EditorToolbar />
      <Quill value={value} onChange={onChange} />
    </div>
  );
}
