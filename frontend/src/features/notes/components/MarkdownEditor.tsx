import { MdEditor, type ToolbarNames } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useTheme } from "../../../contexts/themeProvider";
import useLanguage from "../../languages/hooks/useLanguage";
import { useMemo } from "react";

type MarkdownEditorProps = {
  value: string;
  onSave?: () => void;
  onChange: (value: string) => void;
};

const MarkdownEditor = ({ value, onSave, onChange }: MarkdownEditorProps) => {
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
    "save",
    "prettier",
    "revoke",
    "next",
    "=",
    "preview",
    "previewOnly",
    "catalog",
    "pageFullscreen",
  ];

  const { language } = useLanguage();

  const canEdit = useMemo(() => {
    if (!language) return false;
    return language.user_permissions?.can_edit;
  }, [language]);

  return (
    <MdEditor
      value={value}
      onSave={onSave}
      onChange={onChange}
      disabled={!canEdit}
      toolbars={toolbar}
      language="en-US"
      theme={theme === "dark" ? "dark" : "light"}
      className="min-h-full rounded-lg"
    />
  );
};

export default MarkdownEditor;
