<template>
  <section class="discussion">
    <h2 class="section-title">Обсуждение</h2>
    <p class="discussion-lead">
      Короткий отклик к материалам ленты. Новый текст уходит родителю и появляется в списке.
    </p>
    <form class="comment" :class="{ 'is-focused': focused }" @submit.prevent="submit">
      <img class="avatar" :src="avatar" alt="" width="48" height="48" />
      <div class="field">
        <textarea
          v-model="draft"
          placeholder="Напишите комментарий…"
          aria-label="Текст комментария"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.enter.exact.prevent="submit"
        />
        <div class="field-bar">
          <span v-if="!draft.trim()" class="caption">Введите текст, чтобы отправить</span>
          <span v-else class="caption is-ready">Можно отправить</span>
          <button class="btn btn-post" type="submit" :disabled="!draft.trim()">
            <img class="icon" :src="sendIcon" alt="" />
            Post
          </button>
        </div>
      </div>
    </form>
    <ul v-if="comments.length" class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <span class="comment-author">{{ comment.author }}</span>
        <p class="comment-text">{{ comment.text }}</p>
      </li>
    </ul>
    <p v-else class="empty">Пока нет комментариев</p>
  </section>
</template>

<script>
import avatar from "../assets/svg/avatar-placeholder.svg";
import sendIcon from "../assets/svg/icon-send.svg";

export default {
  name: "CommentSection",
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  emits: ["add-comment"],
  data() {
    return {
      draft: "",
      focused: false,
      avatar,
      sendIcon,
    };
  },
  methods: {
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    submit() {
      const text = this.draft.trim();
      if (!text) {
        return;
      }
      this.$emit("add-comment", text);
      this.draft = "";
    },
  },
};
</script>

<style scoped>
.discussion {
  background: var(--paper);
  border-radius: 24px;
  padding: 32px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 34px;
  font-weight: 600;
  margin: 0 0 12px;
}

.discussion-lead {
  margin: 0 0 20px;
  color: var(--ink-secondary);
  max-width: 640px;
}

.comment {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--paper-elevated);
  border: 1px solid var(--line);
  border-radius: var(--radius-input);
  padding: 16px;
  max-width: 560px;
}

.comment.is-focused {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 4px rgba(15, 61, 58, 0.12);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #e7e5e4;
  flex: none;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.field textarea {
  width: 100%;
  border: 0;
  resize: none;
  min-height: 72px;
  font: 16px/24px var(--font-sans);
  background: transparent;
  color: var(--ink-primary);
  outline: none;
}

.field-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.caption {
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: var(--ink-secondary);
}

.caption.is-ready {
  color: var(--brand-primary);
}

.icon {
  width: 18px;
  height: 18px;
}

.btn {
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: var(--radius-btn);
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.btn-post {
  background: var(--brand-primary);
  color: #fff;
}

.btn-post:hover:not(:disabled) {
  background: var(--brand-primary-hover);
}

.btn-post:disabled {
  background: var(--disabled);
  color: #fff;
  cursor: not-allowed;
}

.comment-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-item {
  background: var(--paper-elevated);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
}

.comment-author {
  display: block;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.comment-text {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
}

.empty {
  margin: 16px 0 0;
  color: var(--ink-muted);
  font-size: 15px;
  line-height: 22px;
}
</style>
