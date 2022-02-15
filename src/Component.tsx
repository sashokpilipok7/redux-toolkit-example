import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "./api";
import { actions } from "./store/slices/user";
import { asyncPostUpdate } from "./store/slices/posts";
import { RootState, AppDispatch } from "./types";

function ButtonComponent({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      Edit first post
    </button>
  );
}

function InputComponent({
  onClose,
  onPostUpdate
}: {
  onClose: () => void;
  onPostUpdate: (value: string) => void;
}) {
  const [value, setValue] = useState<string>("");
  const onSubmit = () => {
    onPostUpdate(value);
    onClose();
  };
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      <button type="button" onClick={onSubmit}>
        Confirm
      </button>
    </>
  );
}

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.posts);
  const { editMode } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const onPostUpdate = (value: string) => {
    dispatch(asyncPostUpdate(value));
  };

  const handleEditMode = () => {
    dispatch(actions.setEditMode(!editMode));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Hello i'm component!
      <div style={{ marginTop: "10px" }}>
        {editMode ? (
          <InputComponent
            onPostUpdate={onPostUpdate}
            onClose={handleEditMode}
          />
        ) : (
          <ButtonComponent onClick={handleEditMode} />
        )}
      </div>
      <ul style={{ paddingLeft: 0 }}>
        {list?.map(({ id, title }) => (
          <li style={{ listStyle: "none", marginTop: "15px" }} key={id}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
