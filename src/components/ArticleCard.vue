<template>
  <BCard no-body class="h-100 border-0 shadow-sm folio-card">
    <BCardImg
      :src="article.image"
      :alt="article.imageAlt"
      placement="top"
      class="folio-cover"
    />
    <BCardBody class="d-flex flex-column">
      <BCardTitle class="folio-serif h5 mb-2">{{ article.title }}</BCardTitle>
      <BCardText class="text-secondary small mb-3">{{ article.excerpt }}</BCardText>
      <div class="d-flex align-items-center gap-2 mb-3">
        <img class="folio-avatar" :src="avatar" alt="" width="32" height="32" />
        <div>
          <div class="small fw-medium">{{ article.author }}</div>
          <div class="small text-secondary">{{ article.date }} · {{ article.readTime }}</div>
        </div>
      </div>
      <div class="d-flex flex-wrap gap-2 mt-auto">
        <BButton
          size="sm"
          :variant="liked ? 'danger' : 'outline-secondary'"
          :aria-pressed="liked"
          aria-label="Like"
          class="d-inline-flex align-items-center gap-1"
          @click="onLike"
        >
          <img class="folio-icon" :src="liked ? likeFilled : likeIcon" alt="" />
          <span>Like</span>
          <span>{{ likes }}</span>
        </BButton>
        <BButton
          size="sm"
          variant="outline-secondary"
          aria-label="Комментарии"
          class="d-inline-flex align-items-center gap-1"
        >
          <img class="folio-icon" :src="commentIcon" alt="" />
          <span>{{ article.comments }}</span>
        </BButton>
        <BButton
          size="sm"
          variant="outline-secondary"
          aria-label="Поделиться"
          class="d-inline-flex align-items-center gap-1"
        >
          <img class="folio-icon" :src="shareIcon" alt="" />
          Share
        </BButton>
      </div>
    </BCardBody>
  </BCard>
</template>

<script>
import {
  BButton,
  BCard,
  BCardBody,
  BCardImg,
  BCardText,
  BCardTitle,
} from "bootstrap-vue-next";
import likeIcon from "../assets/svg/icon-like.svg";
import likeFilled from "../assets/svg/icon-like-filled.svg";
import commentIcon from "../assets/svg/icon-comment.svg";
import shareIcon from "../assets/svg/icon-share.svg";
import avatar from "../assets/svg/avatar-placeholder.svg";

export default {
  name: "ArticleCard",
  components: {
    BButton,
    BCard,
    BCardBody,
    BCardImg,
    BCardText,
    BCardTitle,
  },
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
.folio-cover {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.folio-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background: #e7e5e4;
  flex: none;
}

.folio-icon {
  width: 16px;
  height: 16px;
}
</style>
