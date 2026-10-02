<template>
  <article class="card">
    <img
      class="card-cover"
      :src="article.image"
      :alt="article.imageAlt"
      width="360"
      height="200"
    />
    <div class="card-body">
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-excerpt">{{ article.excerpt }}</p>
      <div class="meta">
        <img class="avatar" :src="avatar" alt="" width="32" height="32" />
        <div>
          <div class="meta-name">{{ article.author }}</div>
          <div class="meta-date">{{ article.date }} · {{ article.readTime }}</div>
        </div>
      </div>
      <div class="actions">
        <button
          type="button"
          class="icon-btn"
          :class="{ 'is-liked': liked }"
          :aria-pressed="liked"
          aria-label="Like"
          @click="onLike"
        >
          <img class="icon" :src="liked ? likeFilled : likeIcon" alt="" />
          <span>Like</span>
          <span>{{ likes }}</span>
        </button>
        <button type="button" class="icon-btn" aria-label="Комментарии">
          <img class="icon" :src="commentIcon" alt="" />
          <span>{{ article.comments }}</span>
        </button>
        <button type="button" class="icon-btn" aria-label="Поделиться">
          <img class="icon" :src="shareIcon" alt="" />
          Share
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import likeIcon from "../assets/svg/icon-like.svg";
import likeFilled from "../assets/svg/icon-like-filled.svg";
import commentIcon from "../assets/svg/icon-comment.svg";
import shareIcon from "../assets/svg/icon-share.svg";
import avatar from "../assets/svg/avatar-placeholder.svg";

export default {
  name: "ArticleCard",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ["like"],
  data() {
    return {
      likes: this.article.likes,
      liked: false,
      likeIcon,
      likeFilled,
      commentIcon,
      shareIcon,
      avatar,
    };
  },
  methods: {
    onLike() {
      this.likes += 1;
      this.liked = true;
      this.$emit("like", this.article.id);
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  background: var(--paper-elevated);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.16s ease, transform 0.16s ease;
}

.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.card-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.card-excerpt {
  margin: 0;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 22px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: #e7e5e4;
  flex: none;
}

.meta-name {
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.meta-date {
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: var(--ink-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.icon {
  width: 18px;
  height: 18px;
}

.icon-btn {
  padding: 8px 12px;
  border-radius: 999px;
  border: 0;
  background: transparent;
  color: var(--ink-secondary);
  font: 600 12px/16px var(--font-sans);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.icon-btn:hover {
  background: var(--paper);
}

.icon-btn.is-liked {
  color: var(--accent-like);
  background: #f8ebe8;
}
</style>
