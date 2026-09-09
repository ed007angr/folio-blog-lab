import { defineComponent } from "vue";
import { useState } from "../hooks/useState";
import Avatar from "./Avatar.jsx";
import PostButton from "./PostButton.jsx";

export default defineComponent({
  name: "CommentInput",
  props: {
    placeholder: {
      type: String,
      default: "Напишите комментарий…",
    },
  },
  setup(props) {
    const [text, setText] = useState("");
    const [focused, setFocused] = useState(false);
    const [comments, setComments] = useState([]);

    const submit = () => {
      const value = text.value.trim();
      if (!value) {
        return;
      }
      setComments((list) => [...list, value]);
      setText("");
    };

    const onKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submit();
      }
    };

    return () => (
      <div>
        <div class={["comment", focused.value ? "is-focused" : ""]}>
          <Avatar size={48} alt="" />
          <div class="field">
            <textarea
              value={text.value}
              placeholder={props.placeholder}
              aria-label="Текст комментария"
              onInput={(event) => setText(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={onKeyDown}
            />
            <div class="field-bar">
              <span class="caption">Enter — отправить</span>
              <PostButton disabled={!text.value.trim()} onClick={submit} />
            </div>
          </div>
        </div>
        {comments.value.length > 0 ? (
          <ul class="comment-list">
            {comments.value.map((item, index) => (
              <li class="comment-item" key={index}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
});
