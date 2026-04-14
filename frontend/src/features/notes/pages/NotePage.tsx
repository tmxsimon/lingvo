import { useEffect, useState } from "react";
import { useNote } from "../hooks/useNote";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import MarkdownEditor from "../../../components/MarkdownEditor";

const NotePage = () => {
  const navigate = useNavigate();

  const { groupId, noteId } = useParams();
  const { note, isLoading, error, editNote } = useNote(
    parseInt(groupId!),
    parseInt(noteId!),
  );

  const [value, setValue] = useState(note?.content || "");

  useEffect(() => {
    if (note) {
      setValue(note.content);
    }
  }, [note]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error?.message}</div>;

  return (
    <div className="gap-base h-screen-no-navbar-page flex w-320 flex-col">
      <Button
        type="text"
        size="large"
        text={note!.name}
        iconBack={<Icon name="close" className="size-5 stroke-2" />}
        onClick={() => navigate(`/notes/${groupId}`)}
      />
      <div className="h-full">
        <MarkdownEditor
          value={value}
          onChange={(val) => {
            setValue(val);
            editNote.mutate({ id: note!.id, content: val });
          }}
        />
      </div>
    </div>
  );
};

export default NotePage;
