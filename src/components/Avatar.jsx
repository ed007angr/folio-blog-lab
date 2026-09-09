import { defineComponent } from "vue";
import placeholder from "../assets/svg/avatar-placeholder.svg";

const SIZES = {
  32: 32,
  48: 48,
  64: 64,
};

export default defineComponent({
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 32,
      validator: (value) => [32, 48, 64].includes(value),
    },
    alt: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return () => {
      const px = SIZES[props.size] ?? 32;
      return (
        <img
          class="avatar"
          src={props.src || placeholder}
          alt={props.alt}
          width={px}
          height={px}
          style={{ width: `${px}px`, height: `${px}px` }}
        />
      );
    };
  },
});
