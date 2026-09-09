import { defineComponent } from "vue";
import sendIcon from "../assets/svg/icon-send.svg";

export default defineComponent({
  name: "PostButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Post",
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    return () => (
      <button
        type="button"
        class="btn btn-post"
        disabled={props.disabled}
        onClick={() => emit("click")}
      >
        <img class="icon" src={sendIcon} alt="" />
        {props.label}
      </button>
    );
  },
});
