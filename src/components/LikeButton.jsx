import { defineComponent } from "vue";
import { useState } from "../hooks/useState";
import likeIcon from "../assets/svg/icon-like.svg";
import likeFilled from "../assets/svg/icon-like-filled.svg";

export default defineComponent({
  name: "LikeButton",
  props: {
    initialCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const [likes, setLikes] = useState(props.initialCount);

    const handleClick = () => {
      setLikes((count) => count + 1);
    };

    return () => {
      const liked = likes.value > props.initialCount;
      return (
        <button
          type="button"
          class={["icon-btn", liked ? "is-liked" : ""]}
          aria-pressed={liked}
          aria-label="Нравится"
          onClick={handleClick}
        >
          <img class="icon" src={liked ? likeFilled : likeIcon} alt="" />
          <span>{likes.value}</span>
        </button>
      );
    };
  },
});
