import { useState } from "react";
import { type Post } from "./Blog";

interface BlogFormProps {
  setNewPost: (value: React.SetStateAction<Post>) => void;
}

const BlogForm = (props: BlogFormProps) => {
  const { setNewPost } = props;
  const [formState, setFormState] = useState({
    title: "",
    text: "",
    isError: false,
  });

  const handleChangeTitle = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      title: target.value,
    }));
  };
  const handleChangeText = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      text: target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.title === "") {
      setFormState((prevState) => ({
        ...prevState,
        isError: true,
      }));
      return;
    }
    setNewPost({
      title: formState.title,
      text: formState.text,
      date: Date.now(),
    });
    setFormState({
      title: "",
      text: "",
      isError: false,
    });
  };
  const handleFocus = () => {
    setFormState((prevState) => ({
      ...prevState,
      isError: false,
    }));
  };

  return (
    <form className="blog block block_white" id="blog" onSubmit={handleSubmit}>
      <div className="blog__inputarea">
        <label className="checklist__label blog__label" htmlFor="blogtitle">
          Title:
        </label>
        <input
          className={
            "blog__input blog__input_header checklist__input" +
            (formState.isError ? " blog__input_error" : "")
          }
          type="text"
          id="blogtitle"
          placeholder={formState.isError ? "Empty title" : "Name your story..."}
          value={formState.title}
          onChange={handleChangeTitle}
          onFocus={handleFocus}
        />
        <input
          className="blog__input blog__input_header checklist__input"
          type="text"
          id="blogtext"
          placeholder="Tell us what happened..."
          value={formState.text}
          onChange={handleChangeText}
        ></input>
      </div>
      <button className="story__button button">Post your story</button>
    </form>
  );
};

export default BlogForm;