import { MdEditor, type ToolbarNames } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useTheme } from "../contexts/themeProvider";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const { theme } = useTheme();

  const toolbar: ToolbarNames[] = [
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "-",
    "title",
    "unorderedList",
    "orderedList",
    "task",
    "link",
    "image",
    "table",
    "mermaid",
    "-",
    "prettier",
    "revoke",
    "next",
    "=",
    "preview",
    "previewOnly",
    "catalog",
    "pageFullscreen",
  ];

  return (
    <MdEditor
      value={value}
      onChange={onChange}
      toolbars={toolbar}
      language="en-US"
      theme={theme === "dark" ? "dark" : "light"}
      className="min-h-full rounded-lg"
    />
  );
};

export default MarkdownEditor;
