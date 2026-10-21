<template>
  <section class="discussion">
    <h2 class="section-title">Обсуждение</h2>
    <form class="comment" @submit.prevent="submit">
      <img class="avatar" src="/icons/avatar-placeholder.svg" alt="" width="48" height="48" />
      <div class="field">
        <textarea
          v-model="draft"
          placeholder="Напишите комментарий…"
          aria-label="Текст комментария"
        />
        <div class="field-bar">
          <span v-if="!draft.trim()" class="caption">Введите текст, чтобы отправить</span>
          <span v-else class="caption is-ready">Можно отправить</span>
          <button class="btn-post" type="submit" :disabled="!draft.trim()">Post</button>
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
export default {
  name: 'CommentSection',
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  emits: ['add-comment'],
  data() {
    return {
      draft: '',
    }
  },
  methods: {
    submit() {
      const text = this.draft.trim()
      if (!text) {
        return
      }
      this.$emit('add-comment', text)
      this.draft = ''
    },
  },
}
</script>

<style scoped>
.discussion {
  margin-top: 40px;
  background: var(--paper);
  border-radius: 24px;
  padding: 32px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 34px;
  font-weight: 600;
  margin: 0 0 20px;
}

.comment {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--paper-elevated);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px;
  max-width: 640px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
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
  color: var(--ink-secondary);
}

.caption.is-ready {
  color: var(--brand-primary);
}

.btn-post {
  border: 0;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 10px;
  background: var(--brand-primary);
  color: #fff;
  font-weight: 600;
}

.btn-post:disabled {
  background: #d6d3d1;
  cursor: not-allowed;
}

.comment-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  max-width: 640px;
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
  font-size: 13px;
  font-weight: 600;
}

.comment-text {
  margin: 4px 0 0;
  font-size: 15px;
  line-height: 22px;
}

.empty {
  margin: 16px 0 0;
  color: var(--ink-secondary);
}
</style>
