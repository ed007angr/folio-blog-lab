import { defineComponent } from "vue";
import commentIcon from "../assets/svg/icon-comment.svg";
import shareIcon from "../assets/svg/icon-share.svg";
import Avatar from "./Avatar.jsx";
import LikeButton from "./LikeButton.jsx";

export default defineComponent({
  name: "ArticleCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    return () => (
      <article class="card">
        <img
          class="card-cover"
          src={props.image}
          alt={props.imageAlt}
          width="360"
          height="200"
        />
        <div class="card-body">
          <h3 class="card-title">{props.title}</h3>
          <p class="card-excerpt">{props.excerpt}</p>
          <div class="meta">
            <Avatar size={32} alt="" />
            <div>
              <div class="meta-name">{props.author}</div>
              <div class="meta-date">
                {props.date} · {props.readTime}
              </div>
            </div>
          </div>
          <div class="actions">
            <LikeButton initialCount={props.likes} />
            <button type="button" class="icon-btn" aria-label="Комментарии">
              <img class="icon" src={commentIcon} alt="" />
              <span>{props.comments}</span>
            </button>
            <button type="button" class="icon-btn" aria-label="Поделиться">
              <img class="icon" src={shareIcon} alt="" />
              Share
            </button>
          </div>
        </div>
      </article>
    );
  },
});
